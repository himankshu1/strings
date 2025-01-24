import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Outlet } from 'react-router';

const MainLayout = () => {
    const isMobile = false;

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <ResizablePanelGroup
                direction="horizontal"
                className="flex-1 flex h-full overflow-hidden"
            >
                {/* left sidebar */}
                <ResizablePanel
                    defaultSize={20}
                    minSize={isMobile ? 0 : 10}
                    maxSize={30}
                >
                    left panel
                </ResizablePanel>

                <ResizableHandle withHandle={!isMobile} />

                {/* middle content */}
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>

                <ResizableHandle withHandle={!isMobile} />

                {/* Right sidebar */}
                <ResizablePanel
                    defaultSize={20}
                    minSize={0}
                    maxSize={25}
                    collapsedSize={0}
                >
                    friends listening to
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default MainLayout;
