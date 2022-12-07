import { Room } from "../../types";

type Props = {
    nodes: Array<any>,
    size: number,
    number: number
}

export default function paginate({nodes, size, number}: Props) {
    const maxPage = Math.ceil(nodes.length / size)

    if(number < 1) {
        number = 1
    }
    if(number > maxPage) {
        number = maxPage
    }

    return {
        nodes: nodes.slice((number * size) - size, (number * size)),
        page: {
          number: number,
          size: size,
          totalElements: nodes.length,
          totalPages: Math.ceil(nodes.length/size),
        },
    }
}