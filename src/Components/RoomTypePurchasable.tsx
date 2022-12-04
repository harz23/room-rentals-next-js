import { PurchasableRoom } from "../types";
import Text from "./Reusables/Text";
import Thumbnail from "./Reusables/Thumbnail";
import { currencies } from "../exports";
import RoomLayout from "./Reusables/RoomLayout";

type Props = {
  room: PurchasableRoom;
};

export default function RoomTypePurchasable({ room }: Props) {
  return (
    <>
      <RoomLayout
        thumbnail={
          <Thumbnail heroUrl={room.heroUrl} title={room.title}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8 p-1 rounded-full bg-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
          </Thumbnail> 
        }
        text={
          <>
            <Text as="h5" variant="title" className="line-clamp-1">
                {room.title}
            </Text>

            <Text as="p" variant="p"color="secondary" className="line-clamp-2">
              {room.description}
            </Text>
          </>
        }
        footer={
          <>
            <div className="flex justify-end mr-2">
              <Text variant="p" className="mt-1">
                Buy at &nbsp;
              </Text>
              <Text as="h5" variant="h5" color="primary" className="inline" >
                  <>
                    {currencies.map(currency => {if(currency.name === room.price.currency) {return currency.symbol}})}
                    {room.price.amount.toLocaleString()}
                  </>
              </Text>
            </div>
          </>
        }
      />
    </>
  );
}