import {NgModule} from "@angular/core";

import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
} from "@angular/material";

import {SelectAutocompleteModule} from "mat-select-autocomplete";

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule,
        MatDividerModule,
        SelectAutocompleteModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule,
        MatDividerModule,
        SelectAutocompleteModule
    ]
})
export class MaterialModule {
}


