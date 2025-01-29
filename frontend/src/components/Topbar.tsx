import { LayoutDashboardIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

const Topbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext)!;

    const isAdmin = user?.role === 'admin';

    console.log(user);

    // todo: login with google redirect. build authcallback page thats shows "Logging you in" for after-redirect from google signin

    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                <img
                    src="/logo.svg"
                    alt="strings logo"
                    className="size-6 text-emerald-400"
                />
                <span className="font-semibold text-emerald-500">Strings</span>
            </div>

            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link
                        to="/admin"
                        className="bg-zinc-800 py-2 px-3 rounded flex items-center gap-2 hover:bg-zinc-900 duration-300"
                    >
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
