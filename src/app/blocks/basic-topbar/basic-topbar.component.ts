import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
    selector: "app-basic-topbar",
    templateUrl: "./basic-topbar.component.html",
    styleUrls: ["./basic-topbar.component.scss"]
})
export class BasicTopbarComponent implements OnInit {

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia("(max-width: 600px)");
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    mobileQuery: MediaQueryList;

    private mobileQueryListener: () => void;

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

    goSwagger(): void {
        window.open("https://api.urnik-mb.cf/swagger/index.html", "_blank");
    }
}
