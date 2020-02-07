import {MediaMatcher} from "@angular/cdk/layout";
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FacultyServiceService} from "src/app/services/faculty-service.service";
import {Faculty} from "src/app/models/faculty";
import {Event} from "src/app/models/event";
import {GridEvent} from "src/app/models/gridEvent";
import {WeekPickerComponent} from "../week-picker/week-picker.component";
import {CurrentWeek} from "../../models/currentWeek";

@Component({
    selector: "app-sidenav",
    templateUrl: "sidenav.component.html",
    styleUrls: ["sidenav.component.scss"]
})
export class SidenavComponent implements OnDestroy {
    @ViewChild(WeekPickerComponent, {static: false})
    weekPickerChild: WeekPickerComponent;

    mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;

    selectedFaculty: Faculty;
    allEvents: Event[];
    schedule: GridEvent[];
    currentWeek: CurrentWeek;

    constructor(changeDetectorRef: ChangeDetectorRef,
                media: MediaMatcher,
                private route: ActivatedRoute,
                private facultyService: FacultyServiceService) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    ngOnInit() {
        this.facultyService.getCurrentWeek().subscribe(res => {
            if (new Date().getDay() === 0) {
                res.CurrentWeek += 1;
            }

            this.currentWeek = res;
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

    onEventsSelected(events) {
        this.weekPickerChild.resetWeek();
        this.allEvents = events;

        this.facultyService.getCurrentWeek().subscribe(res => {
            if (new Date().getDay() === 0) {
                res.CurrentWeek += 1;
            }

            let tempEvents: Event[] = this.filterByWeek(events, res.CurrentWeek);

            tempEvents = this.sortDataByTime(tempEvents);
            tempEvents = this.sortDataByDayOfWeek(tempEvents);

            this.schedule = this.mapToGridObj(tempEvents);
        });
    }

    onWeekChanged(week: number) {
        console.log(this.schedule);
        let tempEvents: Event[] = this.filterByWeek(this.allEvents, week);

        tempEvents = this.sortDataByTime(tempEvents);
        tempEvents = this.sortDataByDayOfWeek(tempEvents);

        this.schedule = this.mapToGridObj(tempEvents);
    }

    sortDataByDayOfWeek(events: Event[]): Event[] {
        events.sort(function (a, b) {
            if (a.DayOfWeek < b.DayOfWeek) {
                return -1;
            }

            if (a.DayOfWeek > b.DayOfWeek) {
                return 1;
            }

            return 0;
        });

        return events;
    }

    sortDataByTime(events: Event[]): Event[] {
        // tslint:disable-next-line:only-arrow-functions
        events.sort(function (a, b) {
            if (a.StartTime < b.StartTime) {
                return -1;
            }

            if (a.StartTime > b.StartTime) {
                return 1;
            }

            return 0;
        });

        return events;
    }

    getTimes(events: Event[]): string[] {
        const times: string[] = [];

        events.forEach(event => {
            if (!times.includes(event.StartTime)) {
                times.push(event.StartTime);
            }
        });

        return times;
    }

    mapToGridObj(events: Event[]): GridEvent[] {
        const gridEvents: GridEvent[] = [];
        const dayInMills = 86400000;
        const weekInMills = 604800000;

        const mon = new Date(new Date().getTime() - new Date().getDay() * dayInMills + dayInMills - ((this.currentWeek.CurrentWeek - this.weekPickerChild.weekControl.value) * weekInMills));

        let currentGroupEvent: GridEvent = new GridEvent();
        currentGroupEvent.dayOfWeek = 0;
        currentGroupEvent.events = [];

        currentGroupEvent.date = mon;

        events.forEach(event => {
            if (event.DayOfWeek !== currentGroupEvent.dayOfWeek) {
                gridEvents.push(currentGroupEvent);
                currentGroupEvent = new GridEvent();
                currentGroupEvent.dayOfWeek = event.DayOfWeek;
                currentGroupEvent.events = [];
                currentGroupEvent.date = new Date(mon.getTime() + dayInMills * event.DayOfWeek);
            }

            currentGroupEvent.events.push(event);
        });

        gridEvents.push(currentGroupEvent);

        return gridEvents;
    }

    filterByWeek(events: Event[], week: number): Event[] {
        events = events.filter(event => event.BeginWeek <= week && event.EndWeek >= week);

        return events;
    }

    goSwagger(): void {
        window.open("https://api.urnik-mb.cf/swagger/index.html", "_blank");
    }
}
