import {Event} from "./event";

export class GridEvent {
  dayOfWeek: number;
  events: Event[];
  date: Date;

  getDayString(): string {
    let str = "";

    switch (this.dayOfWeek) {
      case 0:
        str = "Ponedeljek";
        break;
      case 1:
        str = "Torek";
        break;
      case 2:
        str = "Sreda";
        break;
      case 3:
        str = "Četrtek";
        break;
      case 4:
        str = "Petek";
        break;
    }

    return str;
  }

  getDateString(): string {
    return this.date.getDate() + ". " + this.date.getMonth() + ".";
  }
}
