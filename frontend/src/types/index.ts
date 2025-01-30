import { SignupFormType } from '@/pages/SignupPage';

type UserType = {
    createdAt: string;
    email: string;
    fullName: string;
    imageUrl: string;
    role: string;
    updatedAt: string;
    _id: string;
};

export interface AuthContextType {
    user: UserType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signup: (userData: SignupFormType) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export interface AlbumType {
    _id: string;
    title: string;
    artist: string[];
    imageUrl: string;
    releaseYear: number;
    songs: SongType[];
}

interface SongType {
    _id: string;
    title: string;
    artist: string[];
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MusicContextType {
    albums: AlbumType[];
    songs: SongType[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    getAllAlbums: () => Promise<void>;
    getAllSongs: () => Promise<void>;
    featuredSongs: SongType[];
    getFeaturedSongs: () => Promise<void>;
    getMadeForYouSongs: () => Promise<void>;
    madeForYouSongs: SongType[];
    getTrendingSongs: () => Promise<void>;
    trendingSongs: SongType[];
}

export type AlbumParam = {
    albumId: string;
};

type User = {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
};

export interface IChatContext {
    users: User[];
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
}
