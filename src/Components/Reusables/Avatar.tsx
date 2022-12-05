import clsx from "clsx"
import { HTMLAttributes} from "react"

type Props = HTMLAttributes<HTMLElement> & {
    portraitUrl: string,
    variant?: "sessionUser" | "owner",
}

export default function Avatar({portraitUrl, variant="owner", children, className, ...rest}: Props) {

    return <>
    <picture>
        <img src={portraitUrl}
            alt=""
            className={clsx(
                className,
                {
                    owner: "w-6 h-6",
                    sessionUser: "w-10 h-10"
                }[variant],
                "rounded-full inline"
            )}
          {...rest}
        />
        {children}
    </picture>
    </>
}