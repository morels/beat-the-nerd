import React from "react";

type NESInputTextOwnProps = {
  primary?: boolean;
};

type NESInputTextProps = Partial<
  NESInputTextOwnProps &
    Pick<
      React.AllHTMLAttributes<HTMLInputElement>,
      "value" | "placeholder" | "name" | "onChange"
    >
>;

export const NESInputText = React.forwardRef(
  (props: NESInputTextProps, ref: React.Ref<HTMLInputElement>) => (
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      className="nes-input"
      placeholder={props.placeholder}
      ref={ref}
    />
  )
);
