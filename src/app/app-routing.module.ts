import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KeyHighlightsPageComponent } from './key-highlights/key-highlights-page/key-highlights-page.component';
// tslint:disable-next-line:max-line-length
import { DataQualityMoniteringPageComponent } from './data-quality-monitering/data-quality-monitering-page/data-quality-monitering-page.component';
import { MeasureRemidateDataQualityComponent } from './measure-remidate-data-quality/measure-remidate-data-quality.component';
import { DataQualityMoniteringService } from './data-quality-monitering/service/data-quality-monitering.service';
import { KeyHilightsService } from './key-highlights/key-hilights.service';
import { MeasureRemidateDQService } from './measure-remidate-data-quality/measure-remidate-data-quality.service';
import { InternalControlsPageComponent } from './internal-controls/internal-controls-page/internal-controls-page.component';
import { InternalControlService } from './internal-controls/service/internal-control.service';

const app_routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home',runGuardsAndResolvers:'always' },
    { path: 'home', pathMatch: 'full', component: KeyHighlightsPageComponent,runGuardsAndResolvers:'always' },
    { path: 'dq', pathMatch: 'full', component: DataQualityMoniteringPageComponent,runGuardsAndResolvers:'always' },
    { path: 'mrdq', pathMatch: 'full', component: MeasureRemidateDataQualityComponent,runGuardsAndResolvers:'always' },
	  { path: 'ic', pathMatch: 'full', component: InternalControlsPageComponent,runGuardsAndResolvers:'always' },
    { path: '**', redirectTo: 'home' },
     // catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(
        app_routes,
        { enableTracing: true,
        onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
