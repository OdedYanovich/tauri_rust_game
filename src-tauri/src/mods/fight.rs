use super::level_selector::{get_buttons, get_level};
use crate::TauriStateWrapper;
use rand::seq::SliceRandom;

// https://serde.rs/enum-number.html
#[derive(PartialEq, Default, serde::Serialize, Clone, Debug)]
pub enum CommandType {
    #[default]
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
    //     B0nb,
    //     Nb0nb,
}
#[derive(Default, Clone, serde::Serialize, Debug)]
pub struct Command {
    command_type: CommandType,
    button: char,
    index: u8,
}
impl From<(u8, char, CommandType)> for Command {
    fn from(value: (u8, char, CommandType)) -> Self {
        Self {
            command_type: value.2,
            button: value.1,
            index: value.0,
        }
    }
}

fn get_shuffled_indices(length: u8) -> Vec<u8> {
    use rand::{seq::SliceRandom, thread_rng};
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

#[tauri::command]
pub fn create_commands(commands_vec: TauriStateWrapper<Vec<Command>>) -> Vec<Command> {
    let level = get_level();
    let button_index = get_shuffled_indices(level.buttons);
    let range_index = get_shuffled_indices(level.presses);
    let command_index = get_shuffled_indices(level.commands.len() as u8);
    let mut command_vec = commands_vec.lock().unwrap();
    command_vec.clear();
    for i in 0..level.commands.len() {
        command_vec.push(
            (
                range_index[i],
                get_buttons()[button_index[i] as usize],
                level.commands[command_index[i] as usize]
                    .choose(&mut rand::thread_rng())
                    .unwrap()
                    .clone(),
            )
                .into(),
        );
    }
    // println!("{:#?}\n", (*command_vec));
    (*command_vec).clone()
}

#[tauri::command]
pub fn check_player_action(action: Vec<char>, commands_vec: TauriStateWrapper<Vec<Command>>) -> u8 {
    return if action.len() != get_level().presses as usize {
        2
    } else {
        commands_vec
            .lock()
            .unwrap()
            .iter()
            .any(|command| {
                (command.button != action[command.index as usize])
                    ^ (command.command_type == CommandType::Bi)
            })
            .into()
    };
}
