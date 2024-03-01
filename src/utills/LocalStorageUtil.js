const USER_PREFERENCES_KEY = 'userPreferences';

export function saveUserPreferences(preferences) {
  localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
}

export function getUserPreferences() {
  const preferencesJSON = localStorage.getItem(USER_PREFERENCES_KEY);
  return preferencesJSON ? JSON.parse(preferencesJSON) : null;
}
