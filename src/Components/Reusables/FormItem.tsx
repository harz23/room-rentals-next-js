import { ReactNode } from "react";
import Text from "./Text";

type Props = {
  labelText: string;
  children: ReactNode;
};

export default function FormItem({labelText, children}: Props) {
  return <>
      <label className="group">
        <Text variant="label" className="group-focus-within:text-cyan-600">
          {labelText}
        </Text>
            {children}      
      </label>
    </>
}
