export interface Mood {
    emoji: string;
    label: string;
    color: string;
    value?: string;
}

export type MoodValue = Mood['value'];
