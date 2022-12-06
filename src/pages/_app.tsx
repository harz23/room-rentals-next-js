import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../Components/Header';
import { SessionUser } from "../types";
import { createContext} from "react";
import {NextIntlProvider} from 'next-intl';

export const AuthContext = createContext<SessionUser | undefined>(undefined);

export default function App({ Component, pageProps }: AppProps) {  
  return <>
        <AuthContext.Provider value={pageProps.sessionUser} >
          <NextIntlProvider locale="en" messages={pageProps.translation}>
            <Header/>
            <Component {...pageProps} />
          </NextIntlProvider>
        </AuthContext.Provider>
    </>
}
