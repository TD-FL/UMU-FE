import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {SidenavComponent} from "./blocks/sidenav/sidenav.component";
import {SchedulePickerComponent} from "./blocks/schedule-picker/schedule-picker.component";
import {FacultyPageComponent} from "./pages/faculty-page/faculty-page.component";
import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {BasicTopbarComponent} from "./blocks/basic-topbar/basic-topbar.component";
import {AboutComponent} from "./blocks/about/about.component";
import {FooterComponent} from "./blocks/footer/footer.component";
import {DayOfWeekComponent} from "./blocks/day-of-week/day-of-week.component";
import {ScheduleEventComponent} from "./blocks/schedule-event/schedule-event.component";
import {WeekPickerComponent} from "./blocks/week-picker/week-picker.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";

@NgModule({
  declarations: [
    AppComponent,
      SidenavComponent,
    SchedulePickerComponent,
    FacultyPageComponent,
    SchedulePageComponent,
    NotFoundComponent,
    BasicTopbarComponent,
    AboutComponent,
    FooterComponent,
    DayOfWeekComponent,
    ScheduleEventComponent,
    WeekPickerComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
