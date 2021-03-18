import { Model } from "../models/Model";

// Using Model as generic constraint, but Model is generic class itself, so we need a type for model
// K is passed as second generic type for View and is used as type for Model (first type)
export abstract class View<T extends Model<K>, K> {
  //  regions property will have userShow and userForm properties and they will point to actual divs inside DOM
  regions: { [key: string]: Element } = {};

  // Element is basically a reference to any HTML element
  constructor(public parent: Element, public model: T) {
    // make sure model re-renders on change
    this.bindModel();
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  // required method in child class
  abstract template(): string;
  // optional methods in child class
  eventsMap(): { [key: string]: () => void } {
    return {};
  }
  regionsMap(): { [key: string]: string } {
    return {};
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let key in eventsMap) {
      const [eventName, selector] = key.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[key]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  // <template> element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript
  // content of the template is of type "DocumentFragment"
  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    const documentFragment = templateElement.content;
    this.bindEvents(documentFragment);
    this.mapRegions(documentFragment);
    // nesting
    this.onRender();

    this.parent.append(documentFragment);
  }
}

// Using inheritance and not composition here because we have few bi-directional connections between UserForm and View
