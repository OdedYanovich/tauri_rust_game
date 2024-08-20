use phf::{phf_map, Map};
use PlayerInstruction::*;

pub static mut LEVEL_ID: u8 = 0;

pub enum PlayerInstruction {
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
}
pub struct Level {
    buttons: u8,
    presses: u8,
    instructions: &'static [&'static [PlayerInstruction]],
}

pub fn get_level<'a>() -> &'a Level {
    unsafe { &(LEVELS[&(std::ptr::addr_of!(LEVEL_ID) as u8)]) }
}
#[tauri::command]
pub fn set_level(id: u8) {
    unsafe { LEVEL_ID = id }
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
