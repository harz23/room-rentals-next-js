import Text from './Reusables/Text'
import Avatar from './Reusables/Avatar'
import {useContext} from 'react'
import { AuthContext } from '../pages/_app'
import {useTranslations} from 'next-intl';
import Link from 'next/link'
import { useRouter } from "next/router";
import clsx from 'clsx'

export default function Header() {
    const sessionUser = useContext(AuthContext)
    const t = useTranslations('header');
    const router = useRouter();

    return <>
      <div className="bg-gray-200 p-5">
            <Text as="h2" variant="h2" className="ml-64 inline" >{t("title")}</Text>
            
            <Link href="/rooms?page=1" className={clsx(router.pathname === "/rooms" && "bg-gray-300", "p-2 rounded-md absolute right-1/2")}>{t("cabins")}</Link>

            <Link href="/create" className={clsx(router.pathname === "/create" && "bg-gray-300", "p-2 rounded-md absolute left-1/2")}>{t("add_cabin")}</Link>
            
            <div className="absolute right-10 top-4">
                <Avatar portraitUrl={sessionUser.portraitUrl} variant="sessionUser" className="float-left">
                        <Text as="h5" variant="h5" className="ml-2 inline">{sessionUser.firstName} {sessionUser.lastName}</Text>
                        <Text className="ml-12">{t("amount_starred_rooms", {numStarredRooms: sessionUser.starredRooms.length})}</Text>
                </Avatar>
            </div>
        </div>
    </>
}