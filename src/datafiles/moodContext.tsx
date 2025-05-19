import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MoodEntry, Mood } from './label';
import { loadMoodEntries, saveMoodEntries } from './entryStorage';

// ts stuff
interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (date: string, mood: Mood, note?: string) => void;
  updateEntry: (id: string, mood: Mood, note?: string) => void;
  deleteEntry: (id: string) => void;
  getEntryByDate: (date: string) => MoodEntry | undefined;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

//hook
export const useMoodContext = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoodContext must be used within a MoodProvider');
  }
  return context;
};

interface MoodProviderProps {
  children: ReactNode;
}

// this is the main provider component that holds all the mood logic
export const MoodProvider: React.FC<MoodProviderProps> = ({ children }) => {
  // state to hold all mood entries
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  // load any saved entries
  useEffect(() => {
    const loaded = loadMoodEntries();
    setEntries(loaded);
  }, []);

  // auto-save 
  useEffect(() => {
    saveMoodEntries(entries);
  }, [entries]);

  // adds a new entry or updates an existing one for the same date
  const addEntry = (date: string, mood: Mood, note?: string) => {
    const existingIndex = entries.findIndex(e => e.date.split('T')[0] === date.split('T')[0]);

    if (existingIndex >= 0) {
      // update the existing one
      const updated = [...entries];
      updated[existingIndex] = {
        ...updated[existingIndex],
        mood,
        note,
      };
      setEntries(updated);
    } else {
      // create new entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(), // simple id using timestamp
        date,
        mood,
        note,
      };
      setEntries([...entries, newEntry]);
    }
  };

  // update an entry 
  const updateEntry = (id: string, mood: Mood, note?: string) => {
    setEntries(prev =>
      prev.map(e =>
        e.id === id ? { ...e, mood, note } : e
      )
    );
  };

  // delete an entry 
  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };
  const getEntryByDate = (date: string): MoodEntry | undefined => {
    return entries.find(e => e.date.split('T')[0] === date.split('T')[0]);
  };

  // just logging whenever entries change 
  useEffect(() => {
    console.log('[MoodContext] entries updated:', entries);
  }, [entries]);

  return (
    <MoodContext.Provider
      value={{
        entries,
        addEntry,
        updateEntry,
        deleteEntry,
        getEntryByDate,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
