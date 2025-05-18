import React, { useState, useEffect } from 'react';
import EmojiSelector from './EmojiSelector';
import { useMoodContext } from '../datafiles/moodContext';
import { Mood } from '../datafiles/label';
import { format } from '../datafiles/dateDetails';

interface MoodEntryFormProps {
  date?: string;
}

const MoodEntryForm: React.FC<MoodEntryFormProps> = ({ date }) => {
  const { addEntry, getEntryByDate } = useMoodContext();

  const today = date || new Date().toISOString();
  const formattedDate = format(today);
  const existingEntry = getEntryByDate(today);

  const [selectedMood, setSelectedMood] = useState<Mood | undefined>(existingEntry?.mood);
  const [note, setNote] = useState(existingEntry?.note || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const entry = getEntryByDate(today);
    setSelectedMood(entry?.mood);
    setNote(entry?.note || '');
    setIsSaved(false);
  }, [today, getEntryByDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    addEntry(today, selectedMood, note);
    setIsSaved(true);

    console.log('[debug] mood saved for', today);

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl shadow-lg p-6 transition-all duration-500 animate-fadeInScale">

      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {formattedDate}
      </h2>

      <form onSubmit={handleSubmit}>
        <EmojiSelector
          selectedMood={selectedMood}
          onSelectMood={setSelectedMood}
        />

        <div className="mb-6">
          <label
            htmlFor="note"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-gray-200"
          >
            Add a note 
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything on your mind today ?"
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedMood}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
              !selectedMood
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-lg transform hover:-translate-y-1'
            }`}
          >
            {isSaved ? 'Saved!' : 'Save Mood'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoodEntryForm;
