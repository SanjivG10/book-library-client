
import AuthModal from '@components/common/AuthModal';
import { createContext, useState } from 'react';


export const NotificationContext = createContext();


export const NotificationProvider = ({ children }) => {
    const [showAuthModal, setShowAuthModal] = useState(false);

    return <NotificationContext.Provider value={{ showAuthModal, setShowAuthModal }}>
        {children}
        <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />
    </NotificationContext.Provider>;
};
