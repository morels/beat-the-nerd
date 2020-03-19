import React from "react";
import classNames from "classnames";

type NESSubmitButtonOwnProps = {
  primary?: boolean;
};

type NESSubmitButtonProps = Partial<
  NESSubmitButtonOwnProps &
    Pick<React.AllHTMLAttributes<HTMLButtonElement>, "value">
>;

export const NESSubmitButton: React.FunctionComponent<NESSubmitButtonProps> = ({
  value,
  primary
}) => (
  <input
    type="submit"
    value={value}
    className={classNames("nes-btn", { "is-primary": primary })}
  />
);
