import React from "react";
import classNames from "classnames";

type NESMessageListOwnProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "title" | "style"
>;

type NESMessageListProps = Partial<
  React.PropsWithChildren<NESMessageListOwnProps>
>;

export const NESMessageList = React.forwardRef(
  (props: NESMessageListProps, ref: React.Ref<HTMLDivElement>) => (
    <section
      className={classNames("nes-container", { "with-title": props.title })}
      style={props.style}
    >
      {props.title && <p className="title">{props.title}</p>}
      <section className="message-list">{props.children}</section>
      <div ref={ref}></div>
    </section>
  )
);
