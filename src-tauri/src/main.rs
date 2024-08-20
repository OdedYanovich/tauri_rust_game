// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod levels;
mod mods;

use levels::{fight_step, get_buttons, new_command, LevelID, PROGRESS_LOST_MAX};
use mods::level_selector::set_level;
use std::sync::Mutex;
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .manage(Mutex::new(PROGRESS_LOST_MAX))
        .manage(Mutex::new(vec![vec!['a']]))
        .manage(Mutex::new(LevelID(0)))
        .invoke_handler(tauri::generate_handler![
            get_buttons,
            new_command,
            fight_step,
            set_level,
        ])
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

// enum LevelStage {
//     FullTable,
//     ChosenColumn,
// }
