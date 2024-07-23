use phf::{phf_map, Map};
use std::sync::Mutex;
use PlayerInstruction::*;
pub type StateWrapper<'a, T> = tauri::State<'a, Mutex<T>>;
/// The starting values of managed states are not used
pub fn get_unused_initial_value<T>(something: T) -> Mutex<T> {
    return unsafe { std::mem::transmute::<Mutex<T>, Mutex<T>>(Mutex::new(something)) };
}
pub const PROGRESS_LOST_MAX: u16 = 50;
// https://serde.rs/enum-number.html
#[derive(serde::Serialize)]
enum PlayerInstruction {
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
}
#[derive(serde::Serialize)]
pub struct Level {
    buttons: u8,
    presses: u8,
    instructions: &'static [&'static [PlayerInstruction]],
}
static LEVELS: Map<u8, Level> = phf_map! {
    1u8  => Level{buttons:2,presses:1,instructions:&[&[Bi]]},
    2u8  => Level{buttons:2,presses:1,instructions:&[&[Nbi]]},
    3u8  => Level{buttons:2,presses:1,instructions:&[&[Bi,Nbi]]},
    4u8  => Level{buttons:3,presses:1,instructions:&[&[Bi]]},
    5u8  => Level{buttons:3,presses:1,instructions:&[&[Nbi]]},
    6u8  => Level{buttons:3,presses:1,instructions:&[&[Bi,Nbi]]},
    7u8  => Level{buttons:3,presses:2, instructions:&[&[Bi]]},
    8u8  => Level{buttons:3,presses:2,instructions:&[&[Nbi]]},
    9u8  => Level{buttons:3,presses:2,instructions:&[&[Bi,Nbi]]},
    10u8 => Level{buttons:3,presses:1,instructions:&[&[Nbi],&[Nbi]]},
    11u8 => Level{buttons:3,presses:2,instructions:&[&[Bi],&[Bi]]},
    12u8 => Level{buttons:3,presses:2,instructions:&[&[Nbi],&[Nbi]]},
};
#[tauri::command]
pub fn get_level(current_level: StateWrapper<u8>) -> &Level {
    &(LEVELS[&*current_level.lock().unwrap()])
}

#[tauri::command]
pub fn set_level(selected_level: u8, current_level: StateWrapper<u8>) {
    *current_level.lock().unwrap() = selected_level;
}

pub fn get_index(length: usize) -> usize {
    use rand::Rng;
    rand::thread_rng().gen_range(0..length)
}
#[tauri::command]
pub fn selected_correct_actions(
    current_rangers: Vec<Vec<String>>,
    available_rangers_len: usize,
    current_level: StateWrapper<u8>,
) -> [usize; 3] {
    let selected_command_index = get_index(get_level(current_level).instructions.len());
    let selected_range_index = get_index(available_rangers_len);
    let selected_button_index = get_index(current_rangers[selected_range_index].len());
    [
        selected_command_index,
        selected_range_index,
        selected_button_index,
    ]
}
const LEVEL_BUTTONS_MAX: [char; 5] = ['f', 'g', 'h', 'j', 'k'];

#[tauri::command]
pub fn set_buttons(length: usize, current_buttons: StateWrapper<&[char]>) {
    *current_buttons.lock().unwrap() = &(LEVEL_BUTTONS_MAX[0..length]);
}
#[tauri::command]
pub fn get_buttons<'a>(current_buttons: StateWrapper<&[char]>) -> &'a [char] {
    *current_buttons.lock().unwrap()
}
