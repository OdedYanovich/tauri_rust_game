const invoke = window.__TAURI__.core.invoke; //window.__TAURI__.tauri;
export const getButtons = async (buttons) => {
  return await invoke(await invoke("get_buttons_string"), {
    length: buttons,
  });
};

export const new_command = async (levelIndex) => {
  return await invoke(await invoke("new_command_string"), {
    levelIndex: levelIndex,
  });
};
export const getShuffledIndices = async (length) => {
  return await invoke(await invoke("get_shuffled_indices_string"), {
    length: length,
  });
};

export const getLevel = async (chosenLevel) => {
  return await invoke(await invoke("get_level_string"), {
    levelIndex: chosenLevel,
  });
};
export const selectedCorrectActions = async (
  currentRangers,
  availableRangersLen,
  levelIndex
) => {
  return await invoke(await invoke("selected_correct_actions_string"), {
    currentRangers: currentRangers,
    availableRangersLen: availableRangersLen,
    levelIndex: levelIndex,
  });
};
