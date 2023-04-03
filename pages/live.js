import { BOOK_UPDATE } from '@/graphql/subscriptions/bookUpdate.subscription';
import { getUniqueItemsByKey } from '@/lib/utils';
import { useSubscription } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export async function getStaticProps({ locale = "en" }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}

const LiveBookUpdate = () => {
    const { data, error } = useSubscription(
        BOOK_UPDATE
    );

    console.log(error)

    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        if (data?.bookUpdate) {
            const newNotifications = [{ ...data?.bookUpdate }, ...notifications];
            const uniqueNotifications = getUniqueItemsByKey(newNotifications, "id");
            setNotifications(uniqueNotifications);
        }
    }, [data]);

    const { t } = useTranslation();

    return (
        <div className="container mx-auto">
            {notifications.length === 0 ? (
                <div data-testid="no-notification" className="text-center py-8 text-gray-400">
                    <p className="text-xl font-semibold">{t("No Live Notifications!")}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {notifications.map((notification) => (
                        <div
                            data-testid="notification"
                            key={notification.id}
                            className="flex items-center bg-white p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center justify-center bg-gray-100 rounded-full w-10 h-10">
                                <span className="text-lg ml-1">{notification.rating}</span>
                                <FaStar className="text-yellow-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-600 font-bold text-4xl">{notification.title}</p>
                                <div className="flex items-center">
                                    <p className="font-medium">{notification.username}</p>
                                    <p className="text-gray-400 text-sm ml-4">{notification.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LiveBookUpdate