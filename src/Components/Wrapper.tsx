import {HTMLAttributes} from 'react'

export default function Wrapper({children}: HTMLAttributes<HTMLElement>) {
    return <>
        <div className="grid grid-cols-3 max-w-3xl gap-5 m-auto mt-12">
            {children}
        </div>
    </>
}