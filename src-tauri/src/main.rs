// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod interop;
mod levels;
fn main() {
    use interop::{
        fight_step_string, get_buttons_string, get_level_string, new_command_string,
        selected_correct_actions_string,
    };
    use levels::{
        fight_step, get_buttons, get_level, new_command, selected_correct_actions,
        PROGRESS_LOST_MAX,
    };
    use std::sync::Mutex;
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .manage(Mutex::new(PROGRESS_LOST_MAX))
        .manage(Mutex::new(vec![vec!['a']]))
        .invoke_handler(tauri::generate_handler![
            get_level,
            get_level_string,
            selected_correct_actions,
            selected_correct_actions_string,
            get_buttons,
            get_buttons_string,
            new_command,
            new_command_string,
            fight_step,
            fight_step_string,
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
