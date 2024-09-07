use crate::{mods::level_selector::get_buttons, TauriStateWrapper};
use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use phf::{phf_map, Map};
use tauri::{AppHandle, Emitter};

#[derive(Default, Clone, PartialEq, PartialOrd, FromPrimitive)]
pub enum Menu {
    LevelSelector = 1,
    Sound,
    Exit,
    #[default]
    Credit,
    Fight,
}
#[tauri::command]
pub fn set_interop(current_mod: TauriStateWrapper<Menu>, app: AppHandle, new_mod: u8) {
    current_mod
        .lock()
        .unwrap()
        .set(FromPrimitive::from_u8(new_mod).unwrap(), app);
}
impl Menu {
    fn set(&mut self, new_mod: Self, app: AppHandle) {
        println!("t");
        // These events can be done with 1 emission
        app.emit("hide_content", self.clone() as u8 - 1).unwrap();
        if self.clone() < Menu::Credit {
            app.emit("show_option_text", self.clone() as u8 - 1)
                .unwrap();
        }
        *self = new_mod;
        app.emit("set_credit_text_position", self.clone() as u8)
            .unwrap();

        app.emit("show_content", self.clone() as u8 - 1).unwrap();
        if self.clone() < Menu::Credit {
            app.emit("hide_option_text", self.clone() as u8 - 1)
                .unwrap();
        }

        if self.clone() == Menu::Fight {
            app.emit("fight_init", ()).unwrap();
        }

        if self.clone() == Menu::LevelSelector {
            app.emit("level_is_full", ()).unwrap();
        }
    }
}
#[tauri::command]
pub fn activate_menu(current_mod: TauriStateWrapper<Menu>, key: String, app: AppHandle) {
    let key = key.chars().next().unwrap();
    let mod_associated_with_current_press = KEY_MOD_ASSOCIATION.get(&key);
    let mut current_mod = current_mod.lock().unwrap();
    if let Some(potential_mod) = mod_associated_with_current_press {
        let temp = current_mod.clone();
        (*current_mod).set(
            if temp == *potential_mod {
                Menu::Credit
            } else {
                potential_mod.clone()
            },
            app,
        );
        return;
    }
    let mod_keys: [&[char]; 5] = [
        &['w', 's', 'x', 'e', 'd', 'c', 'r'],
        &['l', 'k', 'j', 'h', 'y', 'u', 'i', 'o'],
        &['y'],
        &['y'],
        get_buttons(),
    ];
    if let Some(current_mod_keys) = mod_keys.get(current_mod.clone() as usize - 1) {
        if current_mod_keys.contains(&key) {
            MOD_FUNCTIONS[current_mod.clone() as usize - 1](app, key);
        };
    }
}
const KEY_MOD_ASSOCIATION: Map<char, Menu> = phf_map! {
    'q' => Menu::LevelSelector,
    'a' => Menu::Sound,
    'z' => Menu::Exit,
};
const MOD_FUNCTIONS: [fn(app: AppHandle, key: char); 5] = [
    |app: AppHandle, key: char| app.emit("update_level_selector", key).unwrap(),
    |app: AppHandle, key: char| app.emit("update_sound", key).unwrap(),
    |app: AppHandle, key: char| app.emit("update_exit", key).unwrap(),
    |app: AppHandle, key: char| app.emit("update_credit", key).unwrap(),
    |app: AppHandle, key: char| app.emit("update_fight", key).unwrap(),
];
