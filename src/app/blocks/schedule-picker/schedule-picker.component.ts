import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {ScheduleService} from "src/app/services/schedule.service";
import {Faculty} from "src/app/models/faculty";
import {FacultyServiceService} from "src/app/services/faculty-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupWithYears} from "src/app/models/groupWithYears";
import {MatListOption} from "@angular/material";
import {Event} from "../../models/event";
import {CurrentWeek} from "src/app/models/currentWeek";

@Component({
    selector: "app-schedule-picker",
    templateUrl: "./schedule-picker.component.html",
    styleUrls: ["./schedule-picker.component.scss"]
})
export class SchedulePickerComponent implements OnInit {
    groupYears: GroupWithYears[];
    selectedUni: Faculty = {ShortName: "", LongName: ""};
    selectedGroup: GroupWithYears = {Name: "", Years: []};
    subGroups: G[] = [];

    opt: G[] = [{name: ""}, {name: ""}];

    eventsSelected: Event[] = [];
    professors: string[] = [];
    subjects: string[] = [];
    empty = false;
    first = true;

    groupControl = new FormControl("", [Validators.required]);
    yearControl = new FormControl("", [Validators.required]);
    subjectControl = new FormControl("", [Validators.required]);
    professorControl = new FormControl("", [Validators.required]);
    currentWeek: CurrentWeek;

    @Output() selectedFaculty: EventEmitter<Faculty> = new EventEmitter();
    @Output() selectedEvents: EventEmitter<Event[]> = new EventEmitter();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private scheduleService: ScheduleService,
                private facultyService: FacultyServiceService) {
    }

    ngOnInit() {
        const uni = this.route.snapshot.paramMap.get("uni");
        this.route.queryParams.subscribe(res => {
                if (this.first) {
                    const queryParams = res;

                    const sType = queryParams.type;
                    const iYear = queryParams.year;
                    let aSubgroups = queryParams.group;

                    this.facultyService.getFaculties().subscribe(faculties => {
                            faculties.forEach(f => {
                                if (f.ShortName === uni) {
                                    this.selectedUni = f as Faculty;
                                    this.selectedFaculty.emit(this.selectedUni);
                                    return;
                                }
                            });

                            this.facultyService.getCurrentWeek().subscribe(res => {
                                if (new Date().getDay() === 0) {
                                    res.CurrentWeek += 1;
                                }

                                this.currentWeek = res as CurrentWeek;
                            });

                            this.facultyService.getSubjectsOfFaculty(this.selectedUni.ShortName).subscribe(result => {
                                this.subjects = result;

                                this.subjects.sort();
                            });

                            this.facultyService.getProfessorsOfFaculty(this.selectedUni.ShortName).subscribe(result => {
                                this.professors = result;

                                this.professors.sort();
                            });

                        },
                        err => {
                            // TODO do error
                        }
                    );

                    this.facultyService.getGroupsYearsOfFaculty(uni).subscribe(groupWithYears => {
                        this.groupYears = groupWithYears as GroupWithYears[];

                        this.groupYears.sort((a, b) => (a.Name > b.Name) ? 1 : -1);

                        this.groupYears.forEach(g => {
                            g.Years = g.Years.sort();
                        });

                        this.selectedGroup = {Name: "", Years: []};

                        if (sType) {
                            this.selectedGroup = this.groupYears.filter(g => g.Name === sType)[0];

                            this.groupControl.setValue(this.selectedGroup);

                            const yearEvent = {
                                value: iYear
                            };

                            if (typeof (aSubgroups) === "string") {
                                aSubgroups = aSubgroups.split(",");
                            }

                            this.opt = aSubgroups;

                            this.changeYear(yearEvent, aSubgroups);
                        }

                    }, err => {/*TODO*/
                    });
                    this.first = false;
                }
            }
        );
    }

    changeGroup(data: MatListOption) {
        this.selectedGroup = data.value;

        this.subGroups = [];
        this.yearControl.reset();
        this.professorControl.reset();
        this.subjectControl.reset();

        this.router.navigate([], {
            queryParams: {
                type: data.value.Name,
                year: null,
                group: null,
            },
            queryParamsHandling: "merge",
        });
    }

    changeYear(data, subs) {
        this.yearControl.setValue(+data.value);

        this.router.navigate([], {
            queryParams: {
                year: data.value
            },
            queryParamsHandling: "merge",
        });

        this.scheduleService.getScheduleOfGroup(this.selectedUni.ShortName, this.selectedGroup.Name, data.value).subscribe(result => {
            this.selectedEvents.emit(result);

            this.eventsSelected = result;

            const subGroups: G[] = [];

            result.forEach(event => {
                const obj = new G();

                obj.name = event.Group.SubGroup;

                const res = subGroups.filter(g => (g.name === event.Group.SubGroup));

                if (res.length === 0) {
                    subGroups.push(obj);
                }
            });

            this.subGroups = subGroups;

            this.professorControl.reset();
            this.subjectControl.reset();

            if (subs) {
                this.subGroupSelected(subs);
            }
        },
          error => {
          debugger
          });
    }

    changeProf(data) {
        this.scheduleService.getScheduleOfProfessor(this.selectedUni.ShortName, data.value).subscribe(result => {
            this.selectedEvents.emit(result);

            this.subGroups = [];
            this.yearControl.reset();
            this.groupControl.reset();
            this.subjectControl.reset();
        });
    }

    changeSub(data) {
        this.scheduleService.getScheduleOfSubject(this.selectedUni.ShortName, data.value).subscribe(result => {
            this.selectedEvents.emit(result);

            this.subGroups = [];
            this.yearControl.reset();
            this.groupControl.reset();
            this.professorControl.reset();
        });
    }

    test(selected) {
        console.log(selected);

    }

    subGroupSelected(e) {
        if (e.length > 0) {
            this.empty = true;
            const filteredEvents = this.eventsSelected.filter(evnt => {
                const res = e.filter(g => (g === evnt.Group.SubGroup));

                if (res.length === 0) {
                    return false;
                }
                let group = "";
                e.forEach(ee => {
                    group += ee + ",";
                });

                group = group.slice(0, group.length - 1);

                this.router.navigate([], {
                    queryParams: {
                        group
                    },
                    queryParamsHandling: "merge",
                });
                return true;
            });

            this.selectedEvents.emit(filteredEvents);
        } else if (this.empty) {
            this.router.navigate([], {
                queryParams: {
                    group: null
                },
                queryParamsHandling: "merge",
            });
            this.empty = false;
            this.selectedEvents.emit(this.eventsSelected);
        }
    }

}

export class G {
    name: string;
}
