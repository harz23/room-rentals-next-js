import { Room } from "../../types";
import {maxRoomsPerPage}  from "../../exports";

type Props = {
    nodes: Array<Room>;
    number: any
}

export default function paginate({nodes, number}: Props) : Array<Room> {
    const maxPage = Math.ceil(nodes.length / maxRoomsPerPage)

    if(number < 1) {
        number = 1
    }
    if(number > maxPage) {
        number = maxPage
    }

    let startIndex = (number * maxRoomsPerPage) - maxRoomsPerPage
    let endIndex = (startIndex + maxRoomsPerPage) - 1

    const rooms: Room[] = []

    for(let i = startIndex; i <= endIndex && i < nodes.length; i++) {
        rooms.push(nodes[i])
    }

    return rooms
}