import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

const routes: Routes = [
  {path: '', component: AppComponent, children: [
    {
      path: '',
      redirectTo: '/formdetails',
      pathMatch: "full"
    },]},
    
  { path: 'form', component: FormDialogComponent },

  { path: 'formdetails', component: FormDetailsComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
