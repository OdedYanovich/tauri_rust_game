use phf::{phf_map, Map};
use std::sync::Mutex;
use PlayerInstruction::*;

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

pub struct CurrentLevel {
    level: Mutex<u8>,
}
impl Default for CurrentLevel {
    fn default() -> Self {
        Self {
            level: Mutex::new(1),
        }
    }
}

#[tauri::command]
pub fn get_level<'a>(current_level: tauri::State<CurrentLevel>) -> &'a Level {
    &(LEVELS[&*current_level.level.lock().unwrap()])
}

#[tauri::command]
pub fn set_level<'a>(selected_level: u8, current_level: tauri::State<CurrentLevel>) {
    *current_level.level.lock().unwrap() = selected_level;
}

#[tauri::command]
pub fn get_index(length: usize) -> usize {
    use rand::Rng;
    rand::thread_rng().gen_range(0..length)
}
// #[derive(serde::Deserialize)]
pub struct Ranges {
    rangers: Vec<Vec<char>>,
}
impl<'de> serde::Deserialize<'de> for Ranges {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        serde_json::Deserializer::from_slice(deserializer);
        // deserializer.deserialize_seq(visitor)
    }
}
#[tauri::command]
pub fn selected_correct_actions(
    current_rangers: Ranges,
    available_rangers_len: usize,
    current_level: tauri::State<CurrentLevel>,
) -> [usize; 3] {
    let selected_command_index = get_index(get_level(current_level).instructions.len());
    let selected_range_index = get_index(available_rangers_len);
    let selected_button_index = get_index(current_rangers.rangers[selected_range_index].len());
    [
        selected_command_index,
        selected_range_index,
        selected_button_index,
    ]
}
