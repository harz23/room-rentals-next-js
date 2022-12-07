import { Room, Collection } from "../../types";

type Props = {
    nodes: Array<Room>;
    number: number
}

const maxRoomsPerPage = 9

export default function paginate({nodes, number}: Props) : Collection<Room> {
    const maxPage = Math.ceil(nodes.length / maxRoomsPerPage)

    if(number < 1) {
        number = 1
    }
    if(number > maxPage) {
        number = maxPage
    }

    let startIndex = (number * maxRoomsPerPage) - maxRoomsPerPage
    let endIndex = (startIndex + maxRoomsPerPage) - 1

    const rooms: Array<Room> = []

    for(let i = startIndex; i <= endIndex && i < nodes.length; i++) {
        rooms.push(nodes[i])
    }

    return {
        nodes: rooms,
        page: {
          number: number,
          size: maxRoomsPerPage,
          totalElements: nodes.length,
          totalPages: Math.ceil(nodes.length/maxRoomsPerPage),
        },
    }
}