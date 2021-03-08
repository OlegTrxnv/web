// type alias for function that receives no arguments and returns no value
type Callback = () => void;

export class Eventing {
  // events is an object with some keys of type string and they will point at array of functions
  events: { [key: string]: Callback[] } = {};

  // register event handlers
  on = (eventName: string, cb: Callback): void => {
    // it could be no handlers yet
    const handlers = this.events[eventName] || [];
    handlers.push(cb);
    this.events[eventName] = handlers;
  };

  // trigger all handlers for certain event to tell the rest of app that smth changed
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName] || [];

    if (handlers.length) {
      handlers.forEach((cb) => cb());
    }
  };
}

// Arrow function to have this bound to instance of eventing
