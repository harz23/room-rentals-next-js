
type Props = {
    ariaLabel: string
}


export default function FormInput({ariaLabel}: Props) {
    return <>
        <input
            type="text"
            className="border p-2 border-gray-200 rounded-md w-full py-2 px-2 disabled:opacity-70 disabled:bg-slate-100 "
            name={ariaLabel}
            aria-label={ariaLabel}
            required
        />  
    </>
}