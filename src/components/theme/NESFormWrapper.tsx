import React from "react";

type NESFormWrapperProps = Pick<React.HTMLAttributes<HTMLDivElement>, "style">;

export const NESFormWrapper: React.FunctionComponent<NESFormWrapperProps> = ({
  style,
  children
}) => {
  const fullStyle: React.CSSProperties = {
    ...style,
    backgroundColor: "white",
    width: "100%"
  };
  return <div style={fullStyle}>{children}</div>;
};
