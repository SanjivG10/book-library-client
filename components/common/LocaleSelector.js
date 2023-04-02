import { useState } from 'react';
import { useRouter } from 'next/router';
import { IoIosArrowDown } from 'react-icons/io';
import { GiEarthAmerica } from 'react-icons/gi';
import { BsFillCircleFill } from 'react-icons/bs';

const LocaleSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const locales = [
        { code: 'en', name: 'English', icon: <GiEarthAmerica /> },
        { code: 'fr', name: 'Français', icon: <GiEarthAmerica /> },
        { code: 'de', name: 'Deutsch', icon: <GiEarthAmerica /> },
        { code: 'es', name: 'Español', icon: <GiEarthAmerica /> },
    ];

    const handleLocaleChange = (localeCode) => {
        router.push(router.pathname, router.asPath, { locale: localeCode });
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="mr-2">{router.locale.toUpperCase()}</span>
                    <span>{locales.find((l) => l.code === router.locale)?.icon}</span>
                    <span className="ml-2">
                        <IoIosArrowDown />
                    </span>
                </button>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        {locales.map((locale) => (
                            <button
                                key={locale.code}
                                onClick={() => {
                                    handleLocaleChange(locale.code);
                                    setIsOpen(false);
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                tabIndex="-1"
                            >
                                <div className="flex items-center">
                                    <span>{locale.icon}</span>
                                    <span className="ml-2">{locale.name}</span>
                                    {router.locale === locale.code && <BsFillCircleFill className="ml-auto text-blue-600" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocaleSelector;
