import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "app-day-of-week",
    templateUrl: "./day-of-week.component.html",
    styleUrls: ["./day-of-week.component.scss"]
})
export class DayOfWeekComponent implements OnInit {
    @Input() events: Event[];
    @Input() dayOfWeek: string;
    @Input() date: Date;

    constructor() {
    }

    ngOnInit() {
    }
}
