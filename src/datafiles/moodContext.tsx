import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MoodEntry, Mood } from './label';
import { loadMoodEntries, saveMoodEntries } from './entryStorage';

interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (date: string, mood: Mood, note?: string) => void;
  updateEntry: (id: string, mood: Mood, note?: string) => void;
  deleteEntry: (id: string) => void;
  getEntryByDate: (date: string) => MoodEntry | undefined;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

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

export const MoodProvider: React.FC<MoodProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const loaded = loadMoodEntries();
    setEntries(loaded);
  }, []);

  // For auto-saving
  useEffect(() => {
    saveMoodEntries(entries);
  }, [entries]);

  const addEntry = (date: string, mood: Mood, note?: string) => {
    // Calender day matching 
    const existingIndex = entries.findIndex(e => e.date.split('T')[0] === date.split('T')[0]);

    if (existingIndex >= 0) {
      const updated = [...entries];
      updated[existingIndex] = {
        ...updated[existingIndex],
        mood,
        note,
      };
      setEntries(updated);
    } else {
      // creating new entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(), // kinda hacky but works
        date,
        mood,
        note,
      };
      setEntries([...entries, newEntry]);
    }
  };

  const updateEntry = (id: string, mood: Mood, note?: string) => {
    setEntries(prev =>
      prev.map(e =>
        e.id === id ? { ...e, mood, note } : e
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const getEntryByDate = (date: string): MoodEntry | undefined => {
    return entries.find(e => e.date.split('T')[0] === date.split('T')[0]);
  };

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
