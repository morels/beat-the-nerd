import React from "react";
import classNames from "classnames";

type NESSubmitButtonOwnProps = {
  primary?: boolean;
};

type NESSubmitButtonProps = Partial<
  NESSubmitButtonOwnProps &
    Pick<React.AllHTMLAttributes<HTMLButtonElement>, "value" | "disabled">
>;

export const NESSubmitButton: React.FunctionComponent<NESSubmitButtonProps> = ({
  value,
  primary,
  disabled
}) => (
  <input
    type="submit"
    value={value}
    disabled={disabled}
    className={classNames(
      "nes-btn",
      { "is-primary": primary },
      { "is-disabled": disabled }
    )}
  />
);
