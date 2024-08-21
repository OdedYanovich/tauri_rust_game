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
    pub buttons: u8,
    pub presses: u8,
    pub commands: &'static [&'static [PlayerInstruction]],
}
impl Level {
    pub fn get_buttons(&self) -> &[char] {
        &['f', 'g', 'h', 'j', 'k'][..(self.buttons as usize)]
    }
}

pub fn get_level<'a>() -> &'a Level {
    unsafe { 
        println!("{}",std::ptr::addr_of!(LEVEL_ID));
        &(LEVELS[&(std::ptr::addr_of!(LEVEL_ID) as u8)]) }
}
#[tauri::command]
pub fn set_level(id: u8) {
    unsafe { LEVEL_ID = id }
}

const LEVELS: Map<u8, Level> = phf_map! {
    1u8  => Level{buttons:2,presses:1,commands:&[&[Bi]]},
    2u8  => Level{buttons:2,presses:1,commands:&[&[Nbi]]},
    3u8  => Level{buttons:2,presses:1,commands:&[&[Bi,Nbi]]},
    4u8  => Level{buttons:3,presses:1,commands:&[&[Bi]]},
    5u8  => Level{buttons:3,presses:1,commands:&[&[Nbi]]},
    6u8  => Level{buttons:3,presses:1,commands:&[&[Bi,Nbi]]},
    7u8  => Level{buttons:3,presses:2, commands:&[&[Bi]]},
    8u8  => Level{buttons:3,presses:2,commands:&[&[Nbi]]},
    9u8  => Level{buttons:3,presses:2,commands:&[&[Bi,Nbi]]},
    10u8 => Level{buttons:3,presses:1,commands:&[&[Nbi],&[Nbi]]},
    11u8 => Level{buttons:3,presses:2,commands:&[&[Bi],&[Bi]]},
    12u8 => Level{buttons:3,presses:2,commands:&[&[Nbi],&[Nbi]]},
};
