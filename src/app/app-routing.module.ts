import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./start-page/start-page.component";
import {DisplayComponent} from "./char-display/display/display.component";
import {EndComponent} from "./end/end.component";

const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'main', redirectTo: '/main/race/human', pathMatch: 'full'},
  {path: 'main/:type/:value', component: DisplayComponent},
  {path: 'end', component: EndComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
