import { PAGE_URLS } from '@/constants/urls';
import { useAuth } from '@/hooks/useAuth.hook';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import LocaleSelector from './LocaleSelector';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
    const { user, setUser } = useAuth();
    const router = useRouter();

    const { t } = useTranslation();

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        router.push(PAGE_URLS.LOGIN);
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href={PAGE_URLS.HOME}>
                            <div className="text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                <FaHome className="inline mx-1" />
                                <div>
                                    {t("Home")}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='flex'>
                        {!user ? (
                            <Link href={PAGE_URLS.LOGIN}>
                                <div className="text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <FaSignInAlt className="inline" />
                                    <div className='mx-1'>
                                        {t("Login")}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <button onClick={() => {
                                logout();
                            }} >
                                <div className="text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <FaSignOutAlt className="inline" />
                                    <div className='mx-1'>
                                        {t("Logout")}
                                    </div>
                                </div>
                            </button>
                        )}
                        <LocaleSelector />
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
