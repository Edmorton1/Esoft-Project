import { action, makeObservable, observable } from "mobx";

class StoreBasePaginDoc {
  constructor() {
    makeObservable(this, {
      cursor: observable,
      history: observable,
      stop: observable,
      setCursor: action,
      setHistory: action,
      setStop: action
    })
  }

	cursor: number = 0;
	history: string[] = [];
	stop: boolean = false;

	setCursor = (cursor: number) => (this.cursor = cursor);
	setHistory = (url: string) => this.history.push(url);
	setStop = () => (this.stop = true);
}

export default StoreBasePaginDoc;
