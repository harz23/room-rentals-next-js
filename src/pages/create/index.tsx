import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import db from "../../db";
import { Collection, Room } from "../../types";
import Head from 'next/head'

type Props = {
  rooms: Collection<Room>;
};

export default function Rooms({ rooms }: Props) {
  return <>
    <Head>
      <title>Cabins - Arrrbnb</title>
    </Head>
    
    <p>Number of rooms: {rooms.nodes.length}</p>;
  </>
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const data = await db.read();

  return {
    props: {
      rooms: {
        nodes: data.rooms,
        page: {
          number: 0,
          size: data.rooms.length,
          totalElements: data.rooms.length,
          totalPages: 1
        }
      }
    }
  };
}
