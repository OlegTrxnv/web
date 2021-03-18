import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const user = User.buildUser({ name: "New user", age: 30 });

const root = document.querySelector("#root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error("No root element found");
}

// Generating tsconfig file turns on Strict Type-Checking Options {default behavior is "off")
