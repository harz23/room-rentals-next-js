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
        <Image src={heroUrl} alt={title} width={400} height={200} className="h-52 w-64 object-cover"/>
        <div className="absolute top-2 right-2">{children}</div>
      </div>
    </>
  );
}