import React from "react";
import classNames from "classnames";

type NESMessageProps = {
  isLeftHanded: boolean;
  message?: string;
};

export const NESMessage: React.FunctionComponent<NESMessageProps> = ({
  isLeftHanded,
  message,
  children
}) => (
  <section className={classNames("message", isLeftHanded ? "-left" : "-right")}>
    {isLeftHanded && <i className="nes-mario"></i>}
    <div
      className={classNames(
        "nes-balloon",
        isLeftHanded ? "from-left" : "from-right"
      )}
    >
      {message ? <p>{message}</p> : children}
    </div>
    {!isLeftHanded && <i className="nes-bcrikko"></i>}
  </section>
);
