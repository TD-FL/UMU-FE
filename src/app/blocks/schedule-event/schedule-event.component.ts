import {Component, Input, OnInit} from "@angular/core";
import {Event} from "../../models/event";

@Component({
    selector: "app-schedule-event",
    templateUrl: "./schedule-event.component.html",
    styleUrls: ["./schedule-event.component.scss"]
})
export class ScheduleEventComponent implements OnInit {
    @Input() eventek: Event;

    constructor() {
    }

    ngOnInit() {
        let time: string[];

        time = this.eventek.StartTime.split(":");

        let date: Date = new Date(2019, 4, 1, +time[0], +time[1]);

        date = new Date(date.getTime() + this.eventek.Duration * 60000);


        let hours = "";
        let minutes = "";

        if ((date.getHours() + "").length === 1) {
            hours += "0";
        }

        if ((date.getMinutes() + "").length === 1) {
            minutes += "0";
        }

        hours += date.getHours();
        minutes += date.getMinutes();

        this.eventek.end = hours + ":" + minutes;
    }

}
