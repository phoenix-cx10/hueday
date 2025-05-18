import { MoodEntry } from './label';


const STORAGE_KEY = 'mood-tracker-entries';


export const saveMoodEntries = (entries: MoodEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving mood entries:', error);
  }
};



export const loadMoodEntries = (): MoodEntry[] => {
  try {
    const entries = localStorage.getItem(STORAGE_KEY);
    if (!entries) return [];
    const parsed = JSON.parse(entries);
    if (Array.isArray(parsed)) {
      return parsed;
    } else {
      console.warn('Parsed data is not an array, returning empty array.');
      return [];
    }
  } catch (error) {
    console.error('Error loading mood entries:', error);
    return [];
  }
};
