import FeaturedSection from '@/components/FeaturedSection';
import SectionGrid from '@/components/SectionGrid';
import Topbar from '@/components/Topbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MusicContext } from '@/providers/MusicProvider';
import { useContext } from 'react';

export default function HomePage() {
    const { featuredSongs, madeForYouSongs, trendingSongs, isLoading } =
        useContext(MusicContext)!;

    console.log(featuredSongs);
    console.log(madeForYouSongs);
    console.log(trendingSongs);

    return (
        <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
            <Topbar />
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-emerald-500">
                        Good Afternoon
                    </h1>
                    <FeaturedSection />

                    <div className="space-y-8">
                        <SectionGrid
                            title="Made For You"
                            songs={madeForYouSongs}
                            isLoading={isLoading}
                        />
                        <SectionGrid
                            title="Trending"
                            songs={trendingSongs}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
}
