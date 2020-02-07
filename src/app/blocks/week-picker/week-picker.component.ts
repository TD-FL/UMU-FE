import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FacultyServiceService} from "src/app/services/faculty-service.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: "app-week-picker",
    templateUrl: "./week-picker.component.html",
    styleUrls: ["./week-picker.component.scss"]
})
export class WeekPickerComponent implements OnInit {
    @Output() weekChanged: EventEmitter<number> = new EventEmitter();

    weeks: number[] = [];

    weekControl = new FormControl("", []);

    constructor(private facultyService: FacultyServiceService) {
    }

    ngOnInit() {
        this.facultyService.getCurrentWeek().subscribe(res => {
            if (new Date().getDay() === 0) {
                res.CurrentWeek += 1;
            }

            for (let i = res.CurrentWeek; i < res.CurrentWeek + 10; i++) {
                this.weeks.push(i);
            }

            this.weekControl.setValue(this.weeks[0]);
        });
    }

    changeWeek(event) {
        this.weekChanged.emit(event.value);
    }

    resetWeek() {
        this.weekControl.setValue(this.weeks[0]);
    }
}
