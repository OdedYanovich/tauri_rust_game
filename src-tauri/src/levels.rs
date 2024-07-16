use phf::{phf_map, Map};
use PlayerInstruction::*;
#[derive(serde::Serialize)]
enum PlayerInstruction {
    Bi,
    Nbi,
    //     B0b,
    //     Nb0b,
    // https://serde.rs/enum-number.html
}
#[derive(Clone, Copy, serde::Serialize)]
pub struct Levels {
    buttons: u8,
    presses: u8,
    instructions: &'static [&'static [PlayerInstruction]],
}
static LEVELS: Map<u8, Levels> = phf_map! {
    1u8  => Levels{buttons:2,presses:1,instructions:&[&[Bi]]},
    2u8  => Levels{buttons:2,presses:1,instructions:&[&[Nbi]]},
    3u8  => Levels{buttons:2,presses:1,instructions:&[&[Bi,Nbi]]},
    4u8  => Levels{buttons:3,presses:1,instructions:&[&[Bi]]},
    5u8  => Levels{buttons:3,presses:1,instructions:&[&[Nbi]]},
    6u8  => Levels{buttons:3,presses:1,instructions:&[&[Bi,Nbi]]},
    7u8  => Levels{buttons:3,presses:2, instructions:&[&[Bi]]},
    8u8  => Levels{buttons:3,presses:2,instructions:&[&[Nbi]]},
    9u8  => Levels{buttons:3,presses:2,instructions:&[&[Bi,Nbi]]},
    10u8 => Levels{buttons:3,presses:1,instructions:&[&[Nbi],&[Nbi]]},
    11u8 => Levels{buttons:3,presses:2,instructions:&[&[Bi],&[Bi]]},
    12u8 => Levels{buttons:3,presses:2,instructions:&[&[Nbi],&[Nbi]]},
};

#[tauri::command]
pub fn get_level<'a>(level: u8) -> &'a Levels {
    &(LEVELS[&level])
}
