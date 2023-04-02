import { ApolloProvider } from '@apollo/client';
import Navbar from '@components/common/Navbar';
import { AuthProvider } from '@context/AuthContext';
import { NotificationProvider } from '@context/NotificationContext';
import { client } from "@graphql/client";
import { appWithTranslation } from 'next-i18next'
import '@styles/globals.css';


const App = ({ Component, pageProps }) => {
  return <ApolloProvider client={client}>
    <AuthProvider>
      <NotificationProvider>
        <Navbar />
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthProvider>
  </ApolloProvider>
}

export default appWithTranslation(App)

