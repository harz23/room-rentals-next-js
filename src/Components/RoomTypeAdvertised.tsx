import { AdvertisedRoom } from "../types";
import Text from "./Reusables/Text";
import Avatar from "./Reusables/Avatar";
import IconButton from "./Reusables/IconButton";
import Thumbnail from "./Reusables/Thumbnail";
import { useContext } from "react";
import RoomLayout from "./Reusables/RoomLayout";
import clsx from 'clsx'
import { AuthContext } from "../pages/rooms";
import RoomAdvertisedLayout from "./Reusables/RoomAdvertisedLayout";

type Props = {
  room: AdvertisedRoom,
};

export default function RoomTypeAdvertised({room}: Props) {
  const sessionUser = useContext(AuthContext)

  return (
    <>
      <RoomLayout
        thumbnail={
          <Thumbnail heroUrl={room.heroUrl} title={room.title}>
            <div className="bg-cyan-600 text-white font-bold text-xs w-12 p-1 text-center">
                AD
            </div>
          </Thumbnail>
        }
        text={
          <>
            <Text 
                as="h5" 
                variant="title" 
                color="white"
            >
                {room.title}
           </Text>

            <Text
              as="p"
              variant="p"
              color="white_gray"
              className="line-clamp-3"
            >
                {room.description}
            </Text>
          </>
        }
        bg_color="cyan"
      />
    </>
  );
}
