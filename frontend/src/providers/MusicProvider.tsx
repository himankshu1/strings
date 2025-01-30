/* eslint-disable react-refresh/only-export-components */
import { axiosClient } from '@/lib/axios';
import { MusicContextType } from '@/types';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const MusicContext = createContext<MusicContextType | undefined>(
    undefined
);

const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [trendingSongs, setTrendingSongs] = useState([]);
    const [madeForYouSongs, setMadeForYouSongs] = useState([]);
    const [featuredSongs, setFeaturedSongs] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //* get all albums
    const getAllAlbums = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get('/album/get-albums');
            // console.log('all albums', data);

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

    //* get featured songs
    const getFeaturedSongs = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get('/song/featured');
            console.log(data);

            setFeaturedSongs(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    //* get made for you songs
    const getMadeForYouSongs = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get('/song/made-for-you');
            setMadeForYouSongs(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    //* get trending songs
    const getTrendingSongs = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get('/song/trending');
            setTrendingSongs(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        try {
            const fetchAllAlbumsAndSongs = async () => {
                const results = await Promise.allSettled([
                    getAllAlbums(),
                    getFeaturedSongs(),
                    getMadeForYouSongs(),
                    getTrendingSongs(),
                ]);

                results.forEach((result) => {
                    if (result.status === 'rejected') {
                        console.log(
                            `Error while fetching an album or song ${result.reason}`
                        );
                    }
                });
            };
            fetchAllAlbumsAndSongs();
        } catch (error) {
            console.log('error while fetching albums and songs', error);
        }
    }, []);

    return (
        <MusicContext.Provider
            value={{
                albums,
                songs,
                isLoading,
                setIsLoading,
                getAllAlbums,
                getAllSongs,
                featuredSongs,
                getFeaturedSongs,
                madeForYouSongs,
                getMadeForYouSongs,
                trendingSongs,
                getTrendingSongs,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export default MusicProvider;
