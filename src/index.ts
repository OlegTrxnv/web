import { User } from "./models/User";

const user = new User({ id: 1, name: "Jane", age: 35 });

user.on("save", () => {
  console.log(user);
});

user.save();

// Generating tsconfig file turns on Strict Type-Checking Options {default behavior is "off")
