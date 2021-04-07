import { User } from "../models/User.js";

export const UserList = {
  oninit: User.loadList,
  view: function () {
    return m(
      ".user-list",
      User.list.map((user) =>
        m(".user-list-item", user.firstName + " " + user.lastName)
      )
    );
  },
};
