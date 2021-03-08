import { AxiosResponse } from "axios";

import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./ApiSync";
// question marks makes properties optional, good for changing only certain properties and creating empty model
export interface UserProps {
  // id comes from API
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000/users";
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(updateObject: UserProps): void {
    this.attributes.set(updateObject);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot be fetched without id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}

// Integrated classes are hardcoded, it does limit the flexibility of composition
// Since classes are hardcoded, bringing interfaces is unnecessary
