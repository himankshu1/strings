import { cn } from '@/lib/utils';
import { HomeIcon, Library, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { buttonVariants } from './ui/button';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { ScrollArea } from './ui/scroll-area';
import PlaylistSkeleton from './skeletons/PlaylistSkeleton';
import { MusicContext } from '@/providers/MusicProvider';

const LeftSidebar = () => {
    const { user } = useContext(AuthContext)!;
    const { albums } = useContext(MusicContext)!;

    const isLoading = false;

    console.log(albums);

    return (
        <div className="h-full flex flex-col gap-2">
            {/* navigation menu */}
            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link
                        to="/"
                        className={cn(
                            buttonVariants({
                                variant: 'ghost',
                                className:
                                    'w-full justify-start text-white hover:bg-zinc-800',
                            })
                        )}
                    >
                        <HomeIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Home</span>
                    </Link>

                    {user && (
                        <Link
                            to="/"
                            className={cn(
                                buttonVariants({
                                    variant: 'ghost',
                                    className:
                                        'w-full justify-start text-white hover:bg-zinc-800',
                                })
                            )}
                        >
                            <MessageCircle className="mr-2 size-5" />
                            <span className="hidden md:inline">Messages</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* library section */}
            <div className="flex-1 rounded-lg bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-5 mr-2" />
                        <span className="hidden md:inline">Playlists</span>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? <PlaylistSkeleton /> : 'Some playlists'}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default LeftSidebar;
