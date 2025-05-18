export type MoodLabel = 'Happy' | 'Neutral' | 'Sad' | 'Angry' | 'Tired' | 'Anxious';

export type Mood = {
  emoji: string;
  label: MoodLabel;
  color: string;
};

export type MoodEntry = {
  id: string;
  date: string;
  mood: Mood;
  note?: string;
};
