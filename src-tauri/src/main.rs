// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod levels;
#[tauri::command]
fn get_shuffled_indices(length: u8) -> Vec<u8> {
    use rand::{seq::SliceRandom, thread_rng};
    let mut vec: Vec<u8> = (0..length).collect();
    vec.shuffle(&mut thread_rng());
    vec
}

// #[tauri::command]
// fn execute_instruction(instruction: PlayerInstruction) {}
fn main() {
    use levels::{
        get_buttons, get_level, get_unused_initial_value, selected_correct_actions, set_buttons,
        set_level,PROGRESS_LOST_MAX
    };
    // let current_level = Arc::new(Mutex::new(get_level(1)));
    tauri::Builder::default()
        .manage(get_unused_initial_value(1u8))
        .manage(get_unused_initial_value(&(['a'][..])))
        .manage(get_unused_initial_value(PROGRESS_LOST_MAX))
        .invoke_handler(tauri::generate_handler![
            get_shuffled_indices,
            get_level,
            set_level,
            selected_correct_actions,
            get_buttons,
            set_buttons,
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
// enum GameStage {
//     Prepare,
//     Action,
// }
