import clsx from 'clsx';
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLElement> & {
    onClick: () => void,
    isPending: boolean,
    children: React.SVGProps<SVGSVGElement>,
    ariaLabel: string
}

export default function IconButton({onClick, isPending, className, children, ariaLabel, ...rest}: Props) {
    
    return (
        <button 
            onClick={onClick}
            className={clsx(isPending && "opacity-50", "hover:bg-gray-100 rounded-full h-8 w-8 p-1", className)}
            aria-label={ariaLabel} 
            {...rest}
        >        
            {children}
        </button>
    )
}


