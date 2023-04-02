import { PAGE_URLS } from '@constants/urls';
import { useRouter } from 'next/router';
import React from 'react'
import { useTranslation } from 'next-i18next';

const AuthModal = ({ showModal, setShowModal }) => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        showModal ? <div
            className={`fixed z-10 inset-0 overflow-y-auto}`}
        >
            <div className="flex items-center justify-center min-h-screen p-4 backdrop-blur">
                <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-lg z-50">
                    <div className="px-6 py-4">
                        <div className="text-lg font-medium text-gray-900 mb-2">
                            {t("Please Login")}
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            {t("You must be logged in to access this feature.")}
                        </p>
                        <div className='flex justify-between'>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                    router.push(PAGE_URLS.LOGIN);
                                    setShowModal(false);
                                }}
                            >

                                {t("Login")}
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >

                                {t("Close")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            : null
    );
};


export default AuthModal