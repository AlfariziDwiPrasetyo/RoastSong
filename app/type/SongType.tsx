interface Artist {
  id: string;
  name: string;
  role: string;
}

interface Image {
  quality: string;
  url: string;
}

interface Song {
  id: string;
  name: string;
  artists: {
    primary: Artist[];
  };
  image: Image[];
}

interface SongContextType {
  selectedSong: Song | null;
  setSelectedSong: (song: Song | null) => void;
}

interface result {
  name: string;
  artist: string;
  text: string;
  image: string;
}

export type { SongContextType, Song, Artist, result };
