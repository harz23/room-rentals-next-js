import { AdvertisedRoom } from "../types";
import Text from "./Reusables/Text";
import Thumbnail from "./Reusables/Thumbnail";
import RoomLayout from "./Reusables/RoomLayout";
import {useTranslations} from 'next-intl';

type Props = {
  room: AdvertisedRoom,
};

export default function RoomTypeAdvertised({room}: Props) {
  const t = useTranslations('rooms.room_advertised'); 

  return (
    <>
      <RoomLayout
        thumbnail={
          <Thumbnail heroUrl={room.heroUrl} title={room.title}>
            <div className="bg-cyan-600 text-white font-bold text-xs w-12 p-1 text-center">
                {t("ad").toUpperCase()}
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
