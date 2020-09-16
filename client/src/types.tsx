export interface User {
  id: number;
  username: string;
}

export interface Series {
  id: number;
  name: string;
  altNames?: string;
  description?: string;
  status: 'ongoing' | 'finished' | 'upcoming';
  coverImg?: string;
  genres?: string;
}

export interface Episode {
  id: number;
  title: string;
  episodeNumber: number;
  type: 'episode' | 'special' | 'movie';
  link: string;
  published?: Date;
  series?: Series;
}

export interface APIResponse {
  status: number;
  data?: any;
  error?: any;
}
