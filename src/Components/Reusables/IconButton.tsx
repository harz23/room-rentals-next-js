import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLElement> & {
    onClick: () => void,
    children: React.SVGProps<SVGSVGElement>
}

export default function IconButton({onClick, className, children, ...rest}: Props) {
    
    return (
        <button onClick={onClick} className={className} {...rest}>
            {children}
        </button>
    )
}