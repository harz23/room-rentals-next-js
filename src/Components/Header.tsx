import Text from './Reusables/Text'
import Avatar from './Reusables/Avatar'
import {useContext} from 'react'
import { AuthContext } from '../pages/_app'
import {useTranslations} from 'next-intl';

export default function Header() {
    const sessionUser = useContext(AuthContext)
    const t = useTranslations('header');

    return <>
      <div className="bg-gray-200 p-5 relative">
            <Text as="h2" variant="h2" className="ml-64">{t("title")}</Text>

            <div className="absolute right-10 top-4">
                <Avatar portraitUrl={sessionUser.portraitUrl} variant="sessionUser" className="float-left">
                        <Text as="h5" variant="h5" className="ml-2 inline">{sessionUser.firstName} {sessionUser.lastName}</Text>
                        <Text className="ml-12">{t("amount_starred_rooms", {numStarredRooms: sessionUser.starredRooms.length})}</Text>
                </Avatar>
            </div>
        </div>
    </>
}