import { MoodEntry } from './label';

// this is the key we’ll use to store and retrieve data in localstorage
const STORAGE_KEY = 'mood-tracker-entries';

/**
 * saves mood entries to localstorage
 * turns the array into a string and stores it
 */
export const saveMoodEntries = (entries: MoodEntry[]): void => {
  try {
    // convert the entries array into a json string and save it
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    // if something goes wrong (like storage being full), log the error
    console.error('error saving mood entries:', error);
  }
};

/**
 * loads mood entries from localstorage
 * tries to get and parse the data, returns an empty array if it fails
 */
export const loadMoodEntries = (): MoodEntry[] => {
  try {
    // try to get the stored json string
    const entries = localStorage.getItem(STORAGE_KEY);
    if (!entries) return []; // nothing found, return empty array

    // try to parse the json string back into an array
    const parsed = JSON.parse(entries);

    // make sure the parsed data is actually an array
    if (Array.isArray(parsed)) {
      return parsed;
    } else {
      // if it's not an array (which is unexpected), warn and return empty array
      console.warn('parsed data is not an array, returning empty array.');
      return [];
    }
  } catch (error) {
    // something went wrong while loading or parsing, log the error
    console.error('error loading mood entries:', error);
    return [];
  }
};
