import { createContext, ReactNode, useState } from 'react';
import { PlayerContextType, SongType } from '@/types';

export const PlayerContext = createContext<PlayerContextType | null>(null);

const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<SongType | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [queue, setQueue] = useState<SongType[]>([]);

    //* initialize album queue
    const initializeQueue = (songs: SongType[]) => {
        setQueue(songs);
        setCurrentSong(songs[0]);
        setCurrentIndex(currentIndex === -1 ? 0 : currentIndex);
    };

    //* toggling the play state
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    //* plays the next song in the album
    const playNext = () => {
        if (queue.length === 0) {
            return;
        }

        const nextIndex = currentIndex + 1;

        //* if there is a next song to play
        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            setIsPlaying(true);
            setCurrentIndex(nextIndex);
            setCurrentSong(nextSong);
        }
        //* no next song to play
        else {
            setIsPlaying(false);
        }
    };

    //* playing the previous song
    const playPrevious = () => {
        if (queue.length === 0) {
            return;
        }

        const prevIndex = currentIndex - 1;

        //* if there is a previous song to play
        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            setIsPlaying(true);
            setCurrentIndex(prevIndex);
            setCurrentSong(prevSong);
        }
        //* no previous song left
        else {
            setIsPlaying(false);
        }
    };

    //* play album
    const playAlbum = (songs: SongType[], startIndex = 0) => {
        if (songs.length === 0) return;
        const song = songs[startIndex];

        setQueue(songs);
        setCurrentSong(song);
        setCurrentIndex(startIndex);
        setIsPlaying(true);
    };

    const setCurrentSongPlaying = (song: SongType | null) => {
        setIsPlaying(true);
        const songIndex = queue.findIndex((song) => song._id === song?._id);
        setCurrentSong(song);
        setCurrentIndex(songIndex !== -1 ? songIndex : currentIndex);
    };

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                currentSong,
                setCurrentSong,
                setCurrentSongPlaying,
                queue,
                currentIndex,
                initializeQueue,
                togglePlay,
                playNext,
                playPrevious,
                playAlbum,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerProvider;
