import { User } from "./models/User";

const collection = User.buildUserCollection();

collection.on("change", () => {
  console.log(collection);
});

collection.fetch();

// Generating tsconfig file turns on Strict Type-Checking Options {default behavior is "off")
