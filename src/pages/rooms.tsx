import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Collection, Room, SessionUser, Id } from "../types";
import db from "../db";
import Wrapper from "../Components/Wrapper";
import RoomListView from "../Components/RoomListView";
import Head from 'next/head'
import { createContext } from "react";
import Header from "../Components/Header";

type Props = {
  rooms: Collection<Room>;
  sessionUser: SessionUser
};

export let AuthContext : React.Context<SessionUser>

export default function Rooms({ rooms, sessionUser }: Props) {
  AuthContext = createContext(sessionUser);

  function onStarred(id: Id) {
    const copyStarredRooms = [...sessionUser.starredRooms]
    const index = copyStarredRooms.indexOf(id);
    index === -1 ? copyStarredRooms.push(id): copyStarredRooms.splice(index, 1)
  }

  return <>
    <Head>
      <title>Cabins - Arrrbnb</title>
    </Head>

    <AuthContext.Provider value={sessionUser}>
      <Header/>
      <Wrapper>
        <RoomListView rooms={rooms.nodes} onStarred={onStarred} />
      </Wrapper>
    </AuthContext.Provider>
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
