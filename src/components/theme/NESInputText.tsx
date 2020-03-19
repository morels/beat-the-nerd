import React from "react";
import classNames from "classnames";

type NESInputTextOwnProps = {
  primary?: boolean;
};

type NESInputTextProps = Partial<
  NESInputTextOwnProps &
    Pick<
      React.AllHTMLAttributes<HTMLInputElement>,
      "value" | "placeholder" | "name" | "onChange" | "disabled"
    >
>;

export const NESInputText = React.forwardRef(
  (props: NESInputTextProps, ref: React.Ref<HTMLInputElement>) => (
    <input
      type="text"
      {...props}
      className={classNames("nes-input", { "is-disabled": props.disabled })}
      ref={ref}
    />
  )
);
