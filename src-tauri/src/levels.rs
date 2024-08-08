use phf::{phf_map, Map};
use PlayerInstruction::*;
pub type StateWrapper<'a, T> = tauri::State<'a, std::sync::Mutex<T>>;

pub const PROGRESS_LOST_MAX: u16 = 50;
// https://serde.rs/enum-number.html
#[derive(serde::Serialize, Clone, Copy)]
pub enum PlayerInstruction {
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
const LEVELS: Map<u8, Level> = phf_map! {
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
pub fn get_level<'a>(level_index: u8) -> &'a Level {
    &(LEVELS[&level_index])
}

fn get_shuffled_indices(length: u8) -> Vec<u8> {
    use rand::{seq::SliceRandom, thread_rng};
    let mut vec: Vec<u8> = (0..length).collect();
    vec.shuffle(&mut thread_rng());
    vec
}

fn get_index(length: usize) -> usize {
    use rand::Rng;
    rand::thread_rng().gen_range(0..length)
}
#[tauri::command]
pub fn selected_correct_actions(
    current_rangers: Vec<Vec<String>>,
    available_rangers_len: usize,
    level_index: u8,
) -> [usize; 3] {
    let selected_command_index = get_index(get_level(level_index).instructions.len());
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
pub fn new_command(
    turns_ranges: StateWrapper<Vec<Vec<char>>>,
    level_index: u8,
) -> Vec<(PlayerInstruction, char, u8)> {
    use rand::seq::SliceRandom;
    let current_level = get_level(level_index);
    let mut current_ranges = vec![
        LEVEL_BUTTONS_MAX[0..(current_level.buttons as usize)].to_vec();
        current_level.presses as usize
    ];
    let ranges_shuffled_indices = get_shuffled_indices(current_level.instructions.len() as u8);
    let mut dom_data = Vec::new();
    for (i, potential_instruction) in current_level.instructions.iter().enumerate() {
        let instruction = &potential_instruction[get_index(potential_instruction.len())];
        let selected_button = *current_ranges[ranges_shuffled_indices[i] as usize]
            .choose(&mut rand::thread_rng())
            .unwrap();
        match *instruction {
            Bi => {
                let _ = current_ranges.iter_mut().enumerate().map(|(index, range)| {
                    if index as u8 != ranges_shuffled_indices[i] {
                        let _ = range.iter().filter(|button| **button != selected_button);
                    } else {
                        *range = vec![selected_button]
                    }
                });
            }
            Nbi => {
                let _ = current_ranges[ranges_shuffled_indices[i] as usize]
                    .iter()
                    .filter(|button| **button != selected_button);
            }
        }
        dom_data.push((
            *instruction,
            selected_button,
            ranges_shuffled_indices[i] + 1,
        ));
    }
    *turns_ranges.lock().unwrap() = current_ranges;
    dom_data
}

#[tauri::command]
pub fn fight_step(turns_ranges: StateWrapper<Vec<Vec<char>>>, player_sequence: Vec<char>) {
    for i in turns_ranges.lock().iter() {}
    // turns_ranges.``
    // for (range, button) in turns_ranges.lock().iter().zip(player_sequence.iter()) {
    //     if range.iter().any(|range_button|range_button==button){}
    // }
}
#[tauri::command]
pub fn get_buttons<'a>(length: usize) -> &'a [char] {
    &(LEVEL_BUTTONS_MAX[0..length])
}

