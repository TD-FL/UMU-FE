import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {Faculty} from "../../models/faculty";
import {FacultyServiceService} from "../../services/faculty-service.service";
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-faculty-page",
  templateUrl: "./faculty-page.component.html",
  styleUrls: ["./faculty-page.component.scss"]
})
export class FacultyPageComponent implements OnInit {
  facultyControl = new FormControl("", [Validators.required]);
  matcher = new MyErrorStateMatcher();

  faculties: Faculty[];

  constructor(private router: Router, private facultyService: FacultyServiceService) {
  }

  ngOnInit() {
    this.facultyService.getFaculties().subscribe(faculties => {
      this.faculties = faculties as Faculty[];
      this.faculties.sort((a, b) => (a.LongName > b.LongName) ? 1 : ((b.LongName > a.LongName) ? -1 : 0));
    });
  }

  onFacultySelected(eventData) {
    if (eventData.value) {
      this.router.navigateByUrl("/faculty/" + encodeURIComponent(eventData.value.ShortName));
    }
  }
}
