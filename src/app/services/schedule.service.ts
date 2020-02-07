import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/event";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ScheduleService {
  private mainURI = environment.apiUrl;

  private scheduleByCurse: string = this.mainURI + "/schedule/course/{faculty}/{name}?client=" + environment.clientName;
  private scheduleByProfessor: string = this.mainURI + "/schedule/professor/{faculty}/{name}?client=" + environment.clientName;
  private scheduleByGroupYear: string = this.mainURI + "/schedule/faculty/{faculty}/{type}/{year}?client=" + environment.clientName;

  constructor(private http: HttpClient) {
  }

  getScheduleOfGroup(faculty: string, type: string, year: number): Observable<Event[]> {
    return this.http.get<Event[]>(this.scheduleByGroupYear.replace("{faculty}", faculty).replace("{type}", type).replace("{year}", year.toString()));
  }

  getScheduleOfSubject(faculty: string, course: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.scheduleByCurse.replace("{faculty}", faculty).replace("{name}", course));
  }

  getScheduleOfProfessor(faculty: string, name: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.scheduleByProfessor.replace("{faculty}", faculty).replace("{name}", name));
  }
}
