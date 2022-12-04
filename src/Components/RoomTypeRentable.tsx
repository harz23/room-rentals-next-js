import { RentableRoom, Id } from "../types";
import Text from "./Reusables/Text";
import Avatar from "./Reusables/Avatar";
import IconButton from "./Reusables/IconButton";
import Thumbnail from "./Reusables/Thumbnail";
import { useContext } from "react";
import RoomLayout from "./Reusables/RoomLayout";
import clsx from 'clsx'
import { AuthContext } from "../pages/rooms";

type Props = {
  room: RentableRoom,
  onStarred: (id: Id) => void
};

export default function RoomTypeRentable({room, onStarred}: Props) {
  const sessionUser = useContext(AuthContext)

  return (
    <>
      <RoomLayout
        thumbnail={
          <Thumbnail heroUrl={room.heroUrl} title={room.title}>
            {room.featured && (
              <div className="p-1 bg-white text-cyan-500 font-bold text-xs">
                FEATURED
              </div>
            )}
          </Thumbnail>
        }
        text={
          <>
            <Text 
                as="h5" 
                variant="title" 
                className={clsx("line-clamp-1", room.featured && "text-cyan-500")}
            >
                {room.title}
           </Text>

            <Text
              as="p"
              variant="p"
              color="secondary"
              className="line-clamp-2"
            >
                {room.description}
            </Text>
          </>
        }
        footer={
          <>
            <Avatar portraitUrl={room.owner.portraitUrl}>
              <Text as="p" variant="p" color="secondary" className="ml-1 inline font-semibold">
                {room.owner.firstName}
              </Text>
            </Avatar>


             <IconButton
              onClick={() => onStarred(room.id)}
              aria-label="Like"
              className="absolute right-2 top-1"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" fill={sessionUser.starredRooms.includes(room.id) ? "gray" : "white"} viewBox="0 0 24 24" strokeWidth="1" stroke="gray" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            </IconButton>
          </>          
        }
      />
    </>
  );
}
