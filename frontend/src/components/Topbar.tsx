import { LayoutDashboardIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

const Topbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext)!;
    const isAdmin = false;

    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                <img src="" alt="" />
                Strings
            </div>

            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link to="/admin">
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                )}

                {user ? (
                    <Button variant={'secondary'} onClick={() => logout()}>
                        Logout
                    </Button>
                ) : (
                    <Button variant={'link'} onClick={() => navigate('/login')}>
                        Login with password
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Topbar;
