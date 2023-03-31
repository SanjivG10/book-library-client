import { PAGE_URLS } from '@constants/urls';
import { useAuth } from '@context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, setUser } = useAuth();
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push(PAGE_URLS.LOGIN);
        setUser(null);
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href={PAGE_URLS.HOME}>
                            <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                                <FaHome className="inline" /> Home
                            </div>
                        </Link>
                    </div>
                    <div>
                        {!user ? (
                            <Link href={PAGE_URLS.LOGIN}>
                                <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <FaSignInAlt className="inline" /> Login
                                </div>
                            </Link>
                        ) : (
                            <button onClick={() => {
                                logout();
                            }} >
                                <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                                    <FaSignOutAlt className="inline" /> Logout
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
