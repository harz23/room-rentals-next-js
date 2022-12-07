import clsx from 'clsx'
import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    ariaLabel: string
}


export default function FormInput({name, ariaLabel, className, ...rest}: Props) {
    return <>
        <input
            type="text"
            className={clsx(className, "border p-2 border-gray-200 rounded-md w-full py-2 px-2 disabled:opacity-70 disabled:bg-slate-100")}
            name={name}
            aria-label={ariaLabel}
            {...rest}
        />  
    </>
}