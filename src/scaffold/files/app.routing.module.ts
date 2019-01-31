import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {HomeComponent} from "./views/home/home.component";

/**
 * Main app routing. Includes the initial empty redirect.
 * @type {[{path: string; redirectTo: string; pathMatch: string}]}
 */
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}
