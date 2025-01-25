import { MusicContext } from '@/providers/MusicProvider';
import { AlbumParam } from '@/types';
import { useContext } from 'react';
import { useParams } from 'react-router';

const AlbumPage = () => {
    const { albums } = useContext(MusicContext)!;
    const { albumId } = useParams<AlbumParam>();

    const filteredAlbum = albums.filter((album) => album._id === albumId);
    console.log(filteredAlbum);

    return <div>albumId: {albumId}</div>;
};

export default AlbumPage;
