import Topbar from '@/components/Topbar';
import { MusicContext } from '@/providers/MusicProvider';
import { useContext } from 'react';

export default function HomePage() {
    const { featuredSongs, madeForYouSongs, trendingSongs } =
        useContext(MusicContext)!;

    console.log(featuredSongs, madeForYouSongs, trendingSongs);

    return (
        <div>
            <Topbar />
        </div>
    );
}
