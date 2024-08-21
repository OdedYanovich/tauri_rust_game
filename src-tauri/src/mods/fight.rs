use crate::TauriStateWrapper;
use rand::{
    distributions::{Distribution, Standard},
    Rng,
};

use super::level_selector::get_level;
// https://serde.rs/enum-number.html
// #[derive(serde::Serialize, Clone, Copy)]
#[derive(PartialEq, Default)]
pub enum CommandType {
    #[default]
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
}
impl Distribution<CommandType> for Standard {
    fn sample<R: Rng + ?Sized>(&self, rng: &mut R) -> CommandType {
        match rng.gen_range(0..=1) {
            0 => CommandType::Bi,
            _ => CommandType::Nbi,
        }
    }
}
#[derive(Default)]
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

#[tauri::command]
pub fn init_fight(commands_vec: TauriStateWrapper<Vec<Command>>) {
    *commands_vec.lock().unwrap() = Vec::with_capacity((*get_level()).commands.len());
}

fn get_shuffled_indices(length: u8) -> Vec<u8> {
    use rand::{seq::SliceRandom, thread_rng};
    let mut vec: Vec<u8> = (0..length).collect();
    vec.shuffle(&mut thread_rng());
    vec
}

#[tauri::command]
pub fn create_commands(commands_vec: TauriStateWrapper<Vec<Command>>) {
    let level = get_level();
    let button_index = get_shuffled_indices(level.buttons);
    let range_index = get_shuffled_indices(level.presses);
    let mut command_vec = commands_vec.lock().unwrap();
    for i in 0..level.commands.len() {
        command_vec.push(
            (
                range_index[i],
                level.get_buttons()[button_index[i] as usize],
                rand::random::<CommandType>(),
            )
                .into(),
        );
    }
}

#[tauri::command]
pub fn check_player_action(
    action: Vec<char>,
    commands_vec: TauriStateWrapper<Vec<Command>>,
) -> bool {
    // for command in (commands_vec.lock().unwrap()).iter() {
    //     if (command.button != input[command.index as usize])
    //         ^ (command.command_type == CommandType::Nbi)
    //     {
    //         return false;
    //     }
    // }
    // true;

    (commands_vec.lock().unwrap()).iter().any(|command| {
        (command.button != action[command.index as usize])
            ^ (command.command_type == CommandType::Nbi)
    })
}
