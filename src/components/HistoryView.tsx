import React, { useState } from 'react';
import { useMoodContext } from '../datafiles/moodContext';
import { Trash2 } from 'lucide-react';
import { format } from '../datafiles/dateDetails';
import '../index.css'

const HistoryView: React.FC = () => {
  const { entries, deleteEntry } = useMoodContext();
  const [filter, setFilter] = useState('all');


  const entryList = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );


  const filtered = filter === 'all'
    ? entryList
    : entryList.filter(e => e.mood.label.toLowerCase() === filter.toLowerCase());

  console.log('[History] Filtered Entries:', filtered); 

  const uniqueMoodsList = Array.from(new Set(entries.map(e => e.mood.label)));

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-6 backdrop-blur-md bg-gray-800/30
      rounded-lg shadow-md p-4 transition-colors animate-fade-in-up duration-300">
        <h2 className="text-lg font-normal font-pacifico mb-3 text-white ">Filter by mood</h2>
        
        <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-md font-caveat font-semibold transition-all animate-fade-in duration-300 ${
          filter === 'all'
          ? 'glassy-gradient'
          : 'backdrop-blur-md bg-white/30 dark:bg-gray-800/30 shadow-md text-gray-200 hover:text-black hover:bg-cyan-400 transition transform duration-200 ease-in-out hover:scale-110'}`}>
          All Entries
        </button>

          {uniqueMoodsList.map((mood) => (
            <button
              key={mood}
              onClick={() => setFilter(mood.toLowerCase())}
              className={`px-4 py-2 rounded-full text-md font-caveat font-semibold transition-colors animate-fade-in duration-200 mood-button ${
                filter === mood.toLowerCase()
                  ? 'glassy-gradient'
                  : 'backdrop-blur-md bg-gray-800/30 shadow-md text-gray-200 hover:text-black hover:bg-cyan-400 transition transform duration-200 ease-in-out hover:scale-110'}`}>
              {mood}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No mood entries found.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg 
              backdrop-blur-xl bg-gray-800/50 animate-zoom-in"
              style={{ borderLeft: `4px solid ${entry.mood.color}` }}>
              <div className="flex justify-between items-start ">
                <div className="flex items-center ">
                  <span
                    className="text-2xl mr-3"
                    role="img"
                    aria-label={entry.mood.label}
                  >
                    {entry.mood.emoji}
                  </span>
                  <div>
                    <h3 className="font-medium text-white">
                      {format(entry.date)}
                    </h3>
                    <p className="text-sm text-black pt-1">
                      Feeling {entry.mood.label}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="p-2 text-gray-50 hover:text-red-500 rounded-lg 
                  hover:bg-gray-700 transition-colors duration-200"
                  aria-label={`Delete entry from ${format(entry.date)}`}>
                  <Trash2 size={16} />
                </button>
              </div>

              {entry.note && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {entry.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
