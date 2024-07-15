// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_shuffled_indices(length: u8) -> Vec<u8> {
    use rand::{seq::SliceRandom, thread_rng};
    let mut vec: Vec<u8> = (0..length).collect();
    vec.shuffle(&mut thread_rng());
    vec
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_shuffled_indices])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// enum Mod {
//     Levels = 1,
//     Sound = 2,
//     Exit = 3,
//     Credit = 4,
//     Game = 5,
// }
// enum Command {
//     Bi,
//     Nbi,
//     B0b,
//     Nb0b,
// }
// enum LevelStage {
//     FullTable,
//     ChosenColumn,
// }
// enum GameStage {
//     Prepare,
//     Action,
// }
