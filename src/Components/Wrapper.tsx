import {HTMLAttributes, ReactNode} from 'react'
import clsx from 'clsx'

type Props = {
    isLoading: boolean,
    children: ReactNode
}

export default function Wrapper({isLoading, children}: Props) {
    return <>
        <div className={clsx("grid grid-cols-3 max-w-3xl gap-5 m-auto mt-12", isLoading && "opacity-50 pointer-events-none select-none")}>
            {children}
        </div>
    </>
}