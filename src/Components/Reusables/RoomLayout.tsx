import { ReactNode } from "react";
import clsx from 'clsx'

type Props = {
  thumbnail: ReactNode;
  text: ReactNode;
  footer?: ReactNode;
  bg_color?: "white" | "cyan"
};

export default function RoomLayout({thumbnail, text, footer, bg_color = "white"}: Props) {

  return <>
    <div >
    {thumbnail}

    <div className={clsx(
      "shadow-md p-3 pb-2 pr-0 h-36 rounded-b-md", 
      {
        white: "",
        cyan: "bg-cyan-600"
      }[bg_color]
      
      )}>
      <div className="h-16">
        {text}
      </div>

      {footer && 
        <>
          <div className="border-t-2 mb-3 mt-3"/> 

          <div className="relative">
            {footer}
          </div>
        </>
      }
      
    </div>
  </div>
  </>
}