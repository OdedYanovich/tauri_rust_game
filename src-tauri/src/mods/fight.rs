use super::level_selector::{get_buttons, get_level};
use crate::TauriStateWrapper;
use rand::{seq::SliceRandom, thread_rng, Rng};
// use tauri::{AppHandle /*, Emitter*/};

#[inline]
fn shuffled_indices(length: u8) -> Vec<u8> {
    let mut vec: Vec<u8> = (0..length).collect();
    vec.shuffle(&mut thread_rng());
    vec
}

#[tauri::command]
pub fn init_fight(commands_vec: TauriStateWrapper<Vec<Command>>) -> usize {
    let command_length = get_level().commands.len();
    *commands_vec.lock().unwrap() = Vec::with_capacity(command_length);
    command_length
}
// https://serde.rs/enum-number.html
#[derive(PartialEq, Default, serde::Serialize, Clone, Debug)]
pub enum PlayerButtonRelationship {
    #[default]
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
    //     B0nb,
    //     Nb0nb,
}
#[derive(Clone, serde::Serialize, Debug)]
enum Visual {
    Button(char),
    Skip(u8),
}
impl Default for Visual {
    fn default() -> Self {
        Self::Skip(0)
    }
}
#[derive(Default, Clone, serde::Serialize, Debug)]
pub struct Command {
    relation: PlayerButtonRelationship,
    visual: Visual,
}

#[tauri::command]
pub fn create_commands(
    commands_vec: TauriStateWrapper<Vec<Command>>,
    // app: AppHandle,
) -> Vec<Command> {
    let level = get_level();
    let randomized_indices_to_buttons = shuffled_indices(level.button_count);
    let mut commands_vec = commands_vec.lock().unwrap();
    let randomized_indices_to_commands = shuffled_indices(level.commands.len() as u8);
    commands_vec.clear();
    let mut rng = thread_rng(); //Should only be created ones

    let mut first = 0;
    for i in 0..level.commands.len() {
        let command_selected_press =
            rng.gen_range(first..=(level.press_demands_count - level.commands.len() as u8));
        let (visual, relation) = if command_selected_press > 0 {
            (
                Visual::Skip(command_selected_press),
                PlayerButtonRelationship::Bi,
            )
        } else {
            (
                Visual::Button(get_buttons()[randomized_indices_to_buttons[i] as usize]),
                level.commands[randomized_indices_to_commands[i] as usize]
                    .choose(&mut rng)
                    .unwrap()
                    .clone(),
            )
        };
        first += command_selected_press;
        if i < level.commands.len() - 1 {
            first += (!((relation
                == level.commands[randomized_indices_to_commands[i + 1] as usize]
                    .choose(&mut rng)
                    .unwrap()
                    .clone())
                && relation == PlayerButtonRelationship::Nbi)) as u8;
        }
        // app.emit("add_command", (i, visual.clone())).unwrap();
        // app.emit("indicate_Nbi", i).unwrap();
        commands_vec.push(Command { visual, relation });
    }
    (*commands_vec).clone()
}

#[tauri::command]
pub fn check_player_action(action: Vec<char>, commands_vec: TauriStateWrapper<Vec<Command>>) -> u8 {
    return if action.len() != get_level().press_demands_count as usize {
        2
    } else {
        let mut current_action = 0;
        commands_vec
            .lock()
            .unwrap()
            .iter()
            .any(|command| {
                // (command.visual != action[command.index as usize])
                //     ^ (command.relation == PlayerButtonRelationship::Bi)
                match command.visual {
                    Visual::Button(selected_button) => {
                        (selected_button != action[current_action as usize])
                            ^ (command.relation == PlayerButtonRelationship::Bi)
                    }
                    Visual::Skip(skips) => {
                        current_action += skips;
                        true
                    }
                }
            })
            .into()
    };
}
