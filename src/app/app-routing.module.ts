import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FacultyPageComponent} from "./pages/faculty-page/faculty-page.component";
import {SchedulePageComponent} from "./pages/schedule-page/schedule-page.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";

const routes: Routes = [
  {path: "about", component: AboutPageComponent},
  {path: "faculty/:uni", component: SchedulePageComponent},
  {path: "", component: FacultyPageComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
