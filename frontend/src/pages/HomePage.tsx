import FeaturedSection from '@/components/FeaturedSection';
import Topbar from '@/components/Topbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MusicContext } from '@/providers/MusicProvider';
import { useContext } from 'react';

export default function HomePage() {
    const { featuredSongs, madeForYouSongs, trendingSongs } =
        useContext(MusicContext)!;

    console.log(featuredSongs);
    console.log(madeForYouSongs);
    console.log(trendingSongs);

    return (
        <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
            <Topbar />
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                        Good Afternoon
                    </h1>
                    <FeaturedSection />
                </div>

                <div className="space-y-8">
                    <p>made for you</p>
                    <p>trending</p>
                </div>
            </ScrollArea>
        </main>
    );
}
