import { useSubscription } from '@apollo/client';
import { FaStar } from 'react-icons/fa';
import { BOOK_UPDATE } from '@graphql/subscriptions/bookUpdate.subscription';
import React, { useEffect, useState } from 'react'
import { v4 } from "uuid";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getStaticProps({ locale = "en" }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}

const LiveBookUpdate = () => {
    const { data } = useSubscription(
        BOOK_UPDATE
    );

    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        if (data?.bookUpdate) {
            const newNotifications = [{ ...data?.bookUpdate, id: v4() }, ...notifications];
            setNotifications(newNotifications);
        }
    }, [data]);

    const { t } = useTranslation();

    return (
        <div className="container mx-auto">
            {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    <p className="text-xl font-semibold">{t("No Live Notifications!")}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <h4 className='mt-2 text-center text-2xl font-semibold'>
                        {t("Live Notifications")}
                    </h4>
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center">
                                <div className="flex items-center justify-center bg-gray-100 rounded-full w-10 h-10">
                                    <FaStar className="text-yellow-400" />
                                </div>
                                <div className="ml-4">
                                    <p className="font-medium text-gray-800">{notification.username}</p>
                                    <p className="text-gray-400 text-sm">{notification.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="text-gray-600 font-medium">{notification.title}</p>
                                <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-md ml-4">
                                    {notification.rating}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LiveBookUpdate