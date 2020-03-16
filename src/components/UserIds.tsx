export type UidType = number;

type UserType = "user" | "cpu";

const UIDs: { [key in UserType]: UidType } = {
  user: 1,
  cpu: 2
};

export default UIDs;
