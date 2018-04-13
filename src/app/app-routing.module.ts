import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KeyHighlightsPageComponent } from './key-highlights/key-highlights-page/key-highlights-page.component';
import { DataQualityMoniteringPageComponent } from './data-quality-monitering/data-quality-monitering-page/data-quality-monitering-page.component';
import { DataQualityMoniteringService } from './data-quality-monitering/service/data-quality-monitering.service';



const app_routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', pathMatch: 'full', component: KeyHighlightsPageComponent },
    { path: 'dq', pathMatch: 'full', component: DataQualityMoniteringPageComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' } //catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(
        app_routes,
        { enableTracing: true } // <-- debugging purposes only
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
