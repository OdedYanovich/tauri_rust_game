use crate::TauriStateWrapper;
use phf::{phf_map, Map};

#[derive(Default, Clone, PartialEq)]
pub enum Menu {
    Fight,
    LevelSelector,
    Sound,
    Exit,
    #[default]
    Credit,
}
impl Menu {
    fn set(&mut self, i: ()) {}
}
#[tauri::command]
pub fn activate_menu(current_mod: TauriStateWrapper<Menu>, key: char) {
    let mod_associated_with_current_press = KEY_MOD_ASSOCIATION.get(&key).clone();
    if let Some(potential_mod) = mod_associated_with_current_press {
        let mut t = current_mod.lock().unwrap();
        (*t).set(if *t == *potential_mod {
        } else {
        })
    }
}
const KEY_MOD_ASSOCIATION: Map<char, Menu> = phf_map! {
    'q' => Menu::LevelSelector,
    'a' => Menu::Sound,
    'z' => Menu::Exit,
};
