import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useState } from "react";
import { NumberParam } from 'serialize-query-params';
import Pagination from "../../Components/Pagination";
import RoomListView from "../../Components/RoomListView";
import paginate from "../../Components/utils/paginate";
import Wrapper from "../../Components/Wrapper";
import db from "../../db";
import { Collection, Room, SessionUser } from "../../types";

type Props = {
  translation: any
  rooms: Collection<Room>,
  sessionUser: SessionUser
};

export default function Rooms({ rooms }: Props) {
  const [loading, setLoading] = useState(false);

  const t = useTranslations('rooms');

  return <>
    <Head>
      <title>{t("page_title")}</title>
    </Head>
    
    <Wrapper isLoading={loading}>
      <RoomListView rooms={rooms.nodes} />
    </Wrapper>
    <Pagination collection={rooms.page} setLoading={setLoading}/>
  </>
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();
  return {
    props: {
      translation: (await import(`../../../translation/${context.locale}.json`)).default,
      rooms: paginate({
          nodes: data.rooms,
          size: 9,
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