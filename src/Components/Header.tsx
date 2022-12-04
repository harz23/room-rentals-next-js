import Text from './Reusables/Text'
import Avatar from './Reusables/Avatar'
import {useContext} from 'react'
import { AuthContext } from '../pages/rooms'


export default function Header() {
    const sessionUser = useContext(AuthContext)

    return <>
        <div className="bg-gray-200 p-5 relative">
            <Text as="h2" variant="h2" className="ml-64">Arrbnb</Text>

            <div className="absolute right-10 top-4">
                <Avatar portraitUrl={sessionUser.portraitUrl} variant="sessionUser" className="float-left">
                        <Text as="h5" variant="h5" className="ml-2 inline">{sessionUser.firstName} {sessionUser.lastName}</Text>
                        <Text className="ml-12">{sessionUser.starredRooms.length} starred cabins</Text>
                </Avatar>
            </div>
        </div>
    </>
}