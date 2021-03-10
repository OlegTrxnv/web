import axios, { AxiosPromise } from "axios";
import { HasId } from "./Model";

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}
  // fetch all data tied to a record
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}

// id is optional in both interface and constraint, but inside Sync class it is of type "number"
// id becomes type "number | undefined" if Strict Type-Checking options are enabled
// configure TS by generating tsconfig file
