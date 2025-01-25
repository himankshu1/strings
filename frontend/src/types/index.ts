interface AlbumType {
    _id: string;
    title: string;
    artist: string[];
    imageUrl: string;
    releaseYear: number;
    songs: string[];
}

interface SongType {
    _id: string;
    title: string;
    artist: string[];
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MusicContextType {
    albums: AlbumType[];
    songs: SongType[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    getAllAlbums: () => Promise<void>;
    getAllSongs: () => Promise<void>;
}
