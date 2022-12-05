import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../Components/Header';
import { SessionUser } from "../types";
import { createContext} from "react";
import {NextIntlProvider} from 'next-intl';

export let AuthContext : React.Context<SessionUser>

export default function App({ Component, pageProps }: AppProps) {
  AuthContext = createContext(pageProps.sessionUser);
  return <>
        <AuthContext.Provider value={pageProps.sessionUser} >
          <NextIntlProvider messages={pageProps.translation}>
            <Header/>
            <Component {...pageProps} />
          </NextIntlProvider>
        </AuthContext.Provider>
    </>
}