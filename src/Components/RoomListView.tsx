import { useTranslations } from "next-intl";
import { useState } from "react";
import Text from '../Components/Reusables/Text';
import { Room } from "../types";
import RoomTypeAdvertised from "./RoomTypeAdvertised";
import RoomTypePurchasable from "./RoomTypePurchasable";
import RoomTypeRentable from "./RoomTypeRentable";
type Props = {
  rooms: Array<Room>
};

export default function RoomListView({rooms}: Props) {
  const [hasError, setHasError] = useState(false)
  const t = useTranslations('error');
  
  return (
    <>
      {rooms.map((room) => {
        if (room.type === "rentable") {
          return <RoomTypeRentable key={room.id} room={room} setHasError={setHasError} />
        }

        if (room.type === "purchasable") {
          return <RoomTypePurchasable key={room.id} room={room} />;
        }

        if (room.type === "advertised") {
          return <RoomTypeAdvertised key={room.id} room={room} />;
        }

        return null;
      })}

      {hasError && 
      <div className="fixed bottom-5 right-10 px-10 py-5 shadow-2xl pointer-events-none" role="region" aria-label="Notification">
        <Text>{t("NoConnection")}</Text>
      </div>}
    </>
  );
}