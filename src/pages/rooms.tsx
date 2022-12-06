import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Room, SessionUser, Collection } from "../types";
import db from "../db";
import Wrapper from "../Components/Wrapper";
import RoomListView from "../Components/RoomListView";
import Head from 'next/head'
import {useTranslations} from 'next-intl';
import {NumberParam} from 'serialize-query-params';
import paginate from "../Components/utils/paginate";
import Pagination from "../Components/Pagination";

type Props = {
  translation: any
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
    <Pagination collection={rooms.page}/>
  </>
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();
  return {
    props: {
      translation: (await import(`../../translation/${context.locale}.json`)).default,
      rooms: paginate({
          nodes: data.rooms,
          number: NumberParam.decode(context.query?.page) || 1
      }),
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