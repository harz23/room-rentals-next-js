import clsx from "clsx";
import { ElementType, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
    as?: ElementType,
    variant?: "h2" | "h5" | "title" | "p"
    color?: "default" | "primary" | "secondary" | "white_gray" |"white"
}

export default function Text({as: Component = "p", variant = "p", color = "default", children, className, ...rest}: Props) {
    return (
        <Component
            className={clsx(
                className,
                {
                    h2: "text-2xl font-bold",
                    h5: "text-base font-bold",
                    title: "text-base font-semibold",
                    p: "text-sm"
                }[variant],
                
                {
                    default: "text-black",
                    primary: "text-cyan-600",
                    secondary: "text-gray-500",
                    white_gray: "text-gray-300",
                    white: "text-white"
                }[color]
            )}
            {...rest}
        >
            {children}
        </Component>
    )
}