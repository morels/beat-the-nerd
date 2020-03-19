import React from "react";

type HeaderProps = {
  title: string;
};

export const Header: React.FunctionComponent<HeaderProps> = ({ title }) => (
  <header>
    <div
      style={{
        margin: "1rem 0",
        textAlign: "center",
        borderBottom: "2px solid black"
      }}
    >
      <h1>{title}</h1>
    </div>
  </header>
);
