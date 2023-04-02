import { ApolloProvider } from '@apollo/client';
import Navbar from '@components/common/Navbar';
import { AuthProvider } from '@context/AuthContext';
import { NotificationProvider } from '@context/NotificationContext';
import { client } from "@graphql/client";
import '@styles/globals.css';


export default function App({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <AuthProvider>
      <NotificationProvider>
        <Navbar />
        <Component {...pageProps} />
      </NotificationProvider>
    </AuthProvider>
  </ApolloProvider>
}
