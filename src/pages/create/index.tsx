import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import db from "../../db";
import { Collection, SessionUser, Room } from "../../types";
import Head from 'next/head'
import {useTranslations} from 'next-intl';
import AddRoom from "../../Components/AddRoom";

type Props = {
  
}

export default function Rooms() {
  const t = useTranslations('add_cabin'); 

  return <>
    <Head>
      <title>{t("create_cabin_page_title")}</title>
    </Head>

    <AddRoom />

  </>
}

export async function getServerSideProps(
  
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();
  
  return {
    props: {
      translation: (await import(`../../../translation/${context.locale}.json`)).default,
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
