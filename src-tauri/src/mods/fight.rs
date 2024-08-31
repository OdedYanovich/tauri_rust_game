use super::level_selector::{get_buttons, get_level};
use crate::TauriStateWrapper;
use rand::{seq::SliceRandom, thread_rng, Rng};

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
// #[derive(Default, Clone, serde::Serialize, Debug)]
// pub struct Command {
//     command_type: PlayerButtonRelation,
//     visual: char,
//     index: u8,
// }
// impl From<(u8, char, PlayerButtonRelation)> for Command {
//     fn from(value: (u8, char, PlayerButtonRelation)) -> Self {
//         Self {
//             command_type: value.2,
//             visual: value.1,
//             index: value.0,
//         }
//     }
// }

fn shuffled_indices(length: u8) -> Vec<u8> {
    let mut vec: Vec<u8> = (0..length).collect();
    vec.shuffle(&mut thread_rng());
    vec
}

#[tauri::command]
pub fn init_fight(commands_vec: TauriStateWrapper<Vec<Command>>) -> usize {
    let command_length = (*get_level()).commands.len();
    *commands_vec.lock().unwrap() = Vec::with_capacity(command_length);
    command_length
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

// fn gen_command(
//     potential_index: std::ops::Range<u8>,
//     mut letters: Vec<char>,
//     output: &mut Vec<Commad>,
// ) {
//     if let Some(t) = letters.pop() {
//         gen_command(potential_index, letters, output);
//     }
// }
#[tauri::command]
pub fn create_commands(commands_vec: TauriStateWrapper<Vec<Command>>) -> Vec<Command> {
        // *command = Command {
        //     visual: Visual::Button(thread_rng().gen_range(first..(level.presses - i as u8)) as char),
        //     relation: level.commands[command_index[i] as usize]
        //         .choose(&mut thread_rng())
        //         .unwrap()
        //         .clone(),
        // };

    let level = get_level();
    let button_index = shuffled_indices(level.buttons);
    let mut commands_vec = commands_vec.lock().unwrap();
    let command_index = shuffled_indices(level.commands.len() as u8);
    commands_vec.clear();

    let mut first = 0;
    for i in 0..level.commands.len() {
        let command_selected_press =
            thread_rng().gen_range(first..(level.commands.len() - i) as u8);
        let (visual, relation) = if command_selected_press > 0 {
            (
                Visual::Skip(command_selected_press),
                PlayerButtonRelationship::Bi,
            )
        } else {
            (
                Visual::Button(get_buttons()[button_index[i] as usize]),
                level.commands[command_index[i] as usize]
                    .choose(&mut thread_rng())
                    .unwrap()
                    .clone(),
            )
        };
        first += command_selected_press + 1;
        commands_vec.push(Command { visual, relation });
    }
    // for (i, command) in commands_vec.iter_mut().enumerate() {
    //     let command_selected_press =
    //         thread_rng().gen_range(first..(level.commands.len() - i) as u8);
    //     let (visual, relation) = if command_selected_press > 0 {
    //         (
    //             Visual::Skip(command_selected_press),
    //             PlayerButtonRelationship::Bi,
    //         )
    //     } else {
    //         (
    //             Visual::Button(get_buttons()[button_index[i] as usize]),
    //             level.commands[command_index[i] as usize]
    //                 .choose(&mut thread_rng())
    //                 .unwrap()
    //                 .clone(),
    //         )
    //     };
    //     first += command_selected_press + 1;
    //     *command = Command { visual, relation };
    // }

    // let range_index = shuffled_indices(level.presses);
    // for i in 0..level.commands.len() {
    //     commands_vec.push(
    //         (
    //             range_index[i],
    //             get_buttons()[button_index[i] as usize],
    //             level.commands[command_index[i] as usize]
    //                 .choose(&mut thread_rng())
    //                 .unwrap()
    //                 .clone(),
    //         )
    //             .into(),
    //     );
    // }

    // println!("{:#?}\n", (*commands_vec));
    (*commands_vec).clone()
}

#[tauri::command]
pub fn check_player_action(action: Vec<char>, commands_vec: TauriStateWrapper<Vec<Command>>) -> u8 {
    return if action.len() != get_level().presses as usize {
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
