import React from "react";

type NESFieldProps = Pick<React.HTMLAttributes<HTMLDivElement>, "style">;

export const NESField: React.FunctionComponent<NESFieldProps> = ({
  style,
  children
}) => (
  <div className="nes-field" style={style}>
    {children}
  </div>
);
