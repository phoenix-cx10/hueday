import React from 'react';
import { useMoodContext } from '../datafiles/moodContext';
import { moods } from '../datafiles/moods';

const StatsDisp: React.FC = () => {
  const { entries } = useMoodContext();

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-200 pt-6">
        <p>Start tracking your moods to see statistics</p>
      </div>
    );
  }

  // Get mood distribution
  const moodCounts = moods.map(mood => {
    const count = entries.filter(e => e.mood.label === mood.label).length;
    return {
      ...mood,
      count,
      percentage: entries.length ? Math.round((count / entries.length) * 100) : 0,
    };
  }).sort((a, b) => b.count - a.count);

  console.log('Stats > mood breakdown:', moodCounts); // remove later

  // Streak- count of consecutive days with entries
  const calculateStreak = () => {
    if (!entries.length) return 0;

    const sorted = entries
      .map(e => new Date(e.date).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a);

    let streak = 1;
    const today = new Date().setHours(0, 0, 0, 0);
    let prev = sorted[0];

    // assumes last entry is for streak logic
    if (prev !== today) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (prev !== yesterday.setHours(0, 0, 0, 0)) {
        return 0;
      }
    }

    for (let i = 1; i < sorted.length; i++) {
      const expected = new Date(prev);
      expected.setDate(expected.getDate() - 1);
      const expectedTime = expected.setHours(0, 0, 0, 0);
      if (sorted[i] === expectedTime) {
        streak++;
        prev = sorted[i];
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();
  const mostCommonMood = moodCounts[0];

  const latestEntry = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="backdrop-blur-md bg-gray-800/30
      shadow-md rounded-lg animate-fade-in-left p-5">
          <h3 className="text-lg font-normal font-pacifico text-white mb-1">Total Entries</h3>
          <p className="text-lg font-medium font-knewave text-gray-800 pl-2">{entries.length}</p>
        </div>

        <div className="backdrop-blur-md bg-gray-800/30
      shadow-md rounded-lg animate-fade-in-down p-5">
          <h3 className="text-lg font-normal font-pacifico text-white mb-1">Current Streak</h3>
          <p className="text-lg font-medium font-knewave text-gray-800 pl-1">{streak} days</p>
        </div>

        <div className="backdrop-blur-md bg-gray-800/30
      shadow-md rounded-lg animate-fade-in-right p-5">
          <h3 className="text-lg font-normal font-pacifico text-white mb-1">Most Common Mood</h3>
          <div className="flex items-center">
            <span className="mr-2 font-knewave font-normal text-lg" role="img" aria-label={mostCommonMood.label}>
              {mostCommonMood.emoji}
            </span>
            <p className="text-lg font-normal font-knewave text-gray-800">
              {mostCommonMood.label}
            </p>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-gray-800/50
       rounded-lg shadow-md animate-fade-in-up p-5">
        <h3 className="text-lg font-normal font-pacifico text-white mb-4">Mood Distribution</h3>
        <div className="space-y-4">
          {moodCounts.map((mood) => (
            <div key={mood.label}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-lg mr-2" role="img" aria-label={mood.label}>
                    {mood.emoji}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {mood.label}
                  </span>
                </div>
                <span className="text-sm text-gray-800">
                  {mood.count} ({mood.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-700 h-2.5 rounded-full">
                <div
                  className="h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${mood.percentage}%`,
                    backgroundColor: mood.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsDisp;
