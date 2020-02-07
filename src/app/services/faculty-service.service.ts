import {Injectable} from "@angular/core";
import {Faculty} from "../models/faculty";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupWithYears} from "../models/groupWithYears";
import {CurrentWeek} from "../models/currentWeek";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class FacultyServiceService {
  private mainURI = environment.apiUrl;

  private faculties: string = this.mainURI + "/faculties?client=" + environment.clientName;
  private groupYears: string = this.mainURI + "/groups/{faculty}/years?client=" + environment.clientName;
  private subjects: string = this.mainURI + "/courses/{faculty}?client=" + environment.clientName;
  private professors: string = this.mainURI + "/professors/{faculty}?client=" + environment.clientName;
  private currWeak: string = this.mainURI + "/week?client=" + environment.clientName;

  constructor(private http: HttpClient) {
  }

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.faculties);
  }

  getGroupsYearsOfFaculty(faculty: string): Observable<GroupWithYears[]> {
    return this.http.get<GroupWithYears[]>(this.groupYears.replace("{faculty}", faculty));
  }

  getProfessorsOfFaculty(faculty: string): Observable<string[]> {
    return this.http.get<string[]>(this.professors.replace("{faculty}", faculty));
  }

  getSubjectsOfFaculty(faculty: string): Observable<string[]> {
    return this.http.get<string[]>(this.subjects.replace("{faculty}", faculty));
  }

  getCurrentWeek(): Observable<CurrentWeek> {
    return this.http.get<CurrentWeek>(this.currWeak);
  }
}
