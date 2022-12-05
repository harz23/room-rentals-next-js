import { Room, Id } from "../types";
import RoomTypeAdvertised from "./RoomTypeAdvertised";
import RoomTypeRentable from "./RoomTypeRentable";
import RoomTypePurchasable from "./RoomTypePurchasable";

type Props = {
  rooms: Array<Room>,
};

export default function RoomListView({rooms}: Props) {
  return (
    <>
      {rooms.map((room) => {
        if (room.type === "rentable") {
          return <RoomTypeRentable key={room.id} room={room} />
        }

        if (room.type === "purchasable") {
          return <RoomTypePurchasable key={room.id} room={room} />;
        }

        if (room.type === "advertised") {
          return <RoomTypeAdvertised key={room.id} room={room} />;
        }

        return null;
      })}
    </>
  );
}