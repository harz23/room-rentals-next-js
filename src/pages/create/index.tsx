import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import db from "../../db";
import { Collection, SessionUser, Room } from "../../types";
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Header from "../../Components/Header";

type Props = {
  rooms: Collection<Room>,
  sessionUser: SessionUser
};

export default function Rooms({ rooms }: Props) {
  const {i18n, t} = useTranslation("common");


  return <>
    <Head>
      <title>{t("create_room_page_title")}</title>
    </Head>

  
    
    <p>Number of rooms: {rooms.nodes.length}</p>;
  </>
}

export async function getServerSideProps(
  {locale}: any,
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      rooms: {
        nodes: data.rooms,
        page: {
          number: 0,
          size: data.rooms.length,
          totalElements: data.rooms.length,
          totalPages: 1
        }
      },
      sessionUser: {
        id: data.sessionUser.id,
        firstName: data.sessionUser.firstName,
        lastName: data.sessionUser.lastName,
        portraitUrl: data.sessionUser.portraitUrl,
        starredRooms: data.sessionUser.starredRooms
      }
    }
  };
}
