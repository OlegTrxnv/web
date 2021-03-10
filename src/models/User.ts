import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";
// question marks makes properties optional, good for changing only certain properties and creating empty model
export interface UserProps {
  // id comes from API
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

// Creating a composed object through a static class method
// The default constructor calls the parent constructor, passing along any arguments that were provided
// Inheritance from Model is actually good idea here
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }
}

// Integrated classes are hardcoded, it does limit the flexibility of composition
// Since classes are hardcoded, bringing interfaces is unnecessary
