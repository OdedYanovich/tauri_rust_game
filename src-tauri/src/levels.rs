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
pub fn get_level<'a>(level: u8) -> &'a Level {
    &(LEVELS[&level])
}
#[tauri::command]
pub fn get_level2<'a>(current_level: tauri::State<CurrentLevel>) -> &'a Level {
    &(LEVELS[&*current_level.level.lock().unwrap()])
    // *current_level.level.lock().unwrap()
}

#[tauri::command]
pub fn set_level<'a>(selected_level: u8, current_level: tauri::State<CurrentLevel>) {
    *current_level.level.lock().unwrap() = selected_level;
}
