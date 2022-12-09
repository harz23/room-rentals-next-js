import { HTMLAttributes } from "react";
import Image from "next/image";

type Props = HTMLAttributes<HTMLElement> & {
  heroUrl: string;
  title: string;
};

export default function Thumbnail({ heroUrl, title, children }: Props) {
  return (
    <>
      <div className="relative">
        <picture>
          <img src={heroUrl} alt={title} className="h-52 w-64 object-cover rounded-t-md"/>
        </picture>

        {children &&
          <div className="absolute top-2 right-2">{children}</div>
        }
      </div>
    </>
  );
}