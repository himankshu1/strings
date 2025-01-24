/* eslint-disable react-refresh/only-export-components */
import { axiosClient } from '@/lib/axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AlbumType = {
    _id: string;
    title: string;
    artist: string[];
    imageUrl: string;
    releaseYear: number;
    songs: string[];
};

type SongType = {
    _id: string;
    title: string;
    artist: string[];
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string;
};

export type MusicContextType = {
    albums: AlbumType[];
    songs: SongType[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    getAllAlbums: () => Promise<void>;
    getAllSongs: () => Promise<void>;
};

export const MusicContext = createContext<MusicContextType | undefined>(
    undefined
);

const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAllAlbumsAndSongs = async () => {
            await getAllAlbums();
            // await getAllSongs();
        };
        fetchAllAlbumsAndSongs();
    }, []);

    //* get all albums
    const getAllAlbums = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get('/album/get-albums');
            setAlbums(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    //* get all songs
    const getAllSongs = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get('/songs');
            setSongs(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MusicContext.Provider
            value={{
                albums,
                songs,
                isLoading,
                setIsLoading,
                getAllAlbums,
                getAllSongs,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export default MusicProvider;
