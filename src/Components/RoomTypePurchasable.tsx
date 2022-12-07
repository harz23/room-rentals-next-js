import { useIntl, useTranslations } from 'next-intl';
import { PurchasableRoom } from "../types";
import RoomLayout from "./Reusables/RoomLayout";
import Text from "./Reusables/Text";
import Thumbnail from "./Reusables/Thumbnail";

type Props = {
  room: PurchasableRoom;
};

export default function RoomTypePurchasable({ room }: Props) {
  const t = useTranslations('room_purchasable');
  const intl = useIntl();

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
            <div className="flex items-baseline justify-end pr-4">
              <Text variant="p" className="mt-1">
                {t("buy")}
              </Text>
              <Text as="h5" variant="h5" color="primary" className="inline ml-1" >
                  <>  
                    {intl.formatNumber(room.price.amount, {style: 'currency', currency: room.price.currency, maximumFractionDigits: 0} )}
                  </>
              </Text>
            </div>
          </>
        }
      />
    </>
  );
}