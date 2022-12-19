import { blackA } from "@radix-ui/colors";
import * as Switch from "@radix-ui/react-switch";
import { styled } from "@stitches/react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string,
  ariaLabel: string
}

export default function Switcher({name, ariaLabel, ...rest}: Props) {
  
  const SwitchRoot = styled(Switch.Root, {
    all: "unset",
    width: 60,
    height: 30,
    marginTop: 5,
    backgroundColor: blackA.blackA8,
    borderRadius: "9999px",
    position: "relative",
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    "&:focus": { boxShadow: `0 0 0 2px black` },
    '&[data-state="checked"]': { backgroundColor: "black" },
  });

  const SwitchThumb = styled(Switch.Thumb, {
    display: "block",
    width: 23,
    height: 23,
    backgroundColor: "white",
    borderRadius: "9999px",
    boxShadow: `0 2px 2px ${blackA.blackA7}`,
    transition: "transform 100ms",
    transform: "translateX(2px)",
    willChange: "transform",
    '&[data-state="checked"]': { transform: "translateX(34px)" },
  });


  return (
    <>
        <SwitchRoot name={name} aria-label={ariaLabel} {...rest}>
            <SwitchThumb />
        </SwitchRoot>
    </>
  );
}
