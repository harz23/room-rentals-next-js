import clsx from 'clsx';
import { isEmptyObject } from 'cypress/types/jquery';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import usePromised, { PromiseData } from "use-promised";
import { AuthContext } from "../pages/_app";
import { HttpError, StarService } from "../services";
import { RentableRoom } from "../types";
import Avatar from "./Reusables/Avatar";
import IconButton from "./Reusables/IconButton";
import RoomLayout from "./Reusables/RoomLayout";
import Text from "./Reusables/Text";
import Thumbnail from "./Reusables/Thumbnail";

type Props = {
  room: RentableRoom,
  setHasError: (bool: boolean) =>  void
};

export default function RoomTypeRentable({room, setHasError}: Props) {
  const [submitPromise, setSubmitPromise] = usePromised<void, HttpError>()
  const sessionUser = useContext(AuthContext)
  const t = useTranslations('room_rentable');
  const router = useRouter();

  useEffect(() => {
    if(submitPromise.error){
      setHasError(true);
    }
    if(submitPromise.fulfilled){
      setHasError(false);
    }
  }, [setHasError, submitPromise])

  return (
    <>
      <RoomLayout
        thumbnail={
          <Thumbnail heroUrl={room.heroUrl} title={room.title}>
            {room.featured && (
              <div className="p-1 bg-white text-cyan-500 font-bold text-xs">
                {t("featured").toUpperCase()}
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
          <div className="flex items-center justify-between pr-2">
            
          <div className="flex gap-2">
            <Avatar portraitUrl={room.owner.portraitUrl} />
            
            <Text as="p" variant="p" color="secondary" className="ml-1 font-semibold flex items-center">
                {room.owner.firstName}
            </Text>
          </div>

             {sessionUser && <IconButton
                onClick={() => {
                  const promise = StarService.post(room.id).then(() => {
                    router.replace(router.asPath, undefined, {scroll: false})
                  });
                  setSubmitPromise(promise);
                }
              }
              aria-label="Star"
              className={clsx(submitPromise.pending && "opacity-50", "hover:bg-gray-100 rounded-full h-8 w-8 p-1")}
            >
              {sessionUser.starredRooms.includes(room.id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="#119fbf" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              )}  
            </IconButton> }
            </div>
          </> 
        }
      />
     
    </>
  );
}