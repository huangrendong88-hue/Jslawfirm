
export interface PosterData {
  title: string;
  englishTitle: string;
  subtitle: string;
  backgroundImage: string;
  isGenerating: boolean;
  progress: number;
  currentTime: string;
}

export interface SavedPoster extends PosterData {
  id: number;
  timestamp: number;
}

export enum LayoutType {
  MUSIC_PLAYER = 'MUSIC_PLAYER',
  MINIMALIST_TYPO = 'MINIMALIST_TYPO'
}
