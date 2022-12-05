import { GetServerSidePropsResult } from "next";
import { Collection, Room, SessionUser } from "../types";
import db from "../db";
import Wrapper from "../Components/Wrapper";
import RoomListView from "../Components/RoomListView";
import Head from 'next/head'
import {useTranslations} from 'next-intl';

type Props = {
  translation: JSON,
  rooms: Collection<Room>,
  sessionUser: SessionUser
};

export default function Rooms({ rooms }: Props) {
  const t = useTranslations('rooms'); 
  
  return <>
    <Head>
      <title>{t("page_title")}</title>
    </Head>
    
    <Wrapper>
      <RoomListView rooms={rooms.nodes} />
    </Wrapper>   
  </>
}

export async function getServerSideProps({ locale }: any): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();

  return {
    props: {
      translation: (await import(`../../translation/${locale}.json`)).default,
      rooms: {
        nodes: data.rooms,
        page: {
          number: 0,
          size: data.rooms.length,
          totalElements: 9,
          totalPages: 1,
        },
      },
      sessionUser: {
        id: data.sessionUser.id,
        firstName: data.sessionUser.firstName,
        lastName: data.sessionUser.lastName,
        portraitUrl: data.sessionUser.portraitUrl,
        starredRooms: data.sessionUser.starredRooms
      }
    },
  };
}
