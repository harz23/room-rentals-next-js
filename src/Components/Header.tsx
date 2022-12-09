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
    <div className="border-b bg-slate-100 py-4">
      <div className="flex items-center justify-between m-auto max-w-4xl ">

            <Link href="/rooms">
                <Text as="h2" variant="h2" className="inline" >{t("title")}</Text>
            </Link>

            <div className="flex gap-2">
                <Link href="/rooms" className={clsx(router.pathname === "/rooms" && "bg-gray-200", "p-2 rounded-md")}>
                    <Text variant='navigation' className={clsx(router.pathname === "/rooms" && "font-semibold")}>
                        {t("cabins")}
                    </Text>
                </Link>

                <Link href="/create" className={clsx(router.pathname === "/create" && "bg-gray-200", "p-2 rounded-md")}>
                    <Text variant='navigation' className={clsx(router.pathname === "/create" && "font-semibold")}>
                        {t("add_cabin")}
                    </Text>
                </Link>
            </div>

            { sessionUser !== undefined &&
                <div className="flex items-center gap-2">
                    <Avatar portraitUrl={sessionUser.portraitUrl} variant="sessionUser" userName={`${sessionUser.firstName} ${sessionUser.lastName}`} />
                    
                    <div>
                        <Text as="h5" variant="h5" className="inline">{sessionUser.firstName} {sessionUser.lastName}</Text>
                        <Text className="">{t("amount_starred_rooms", {numStarredRooms: sessionUser.starredRooms.length})}</Text>
                    </div>
                </div>
            }
        </div>
    </div>
    </>
}