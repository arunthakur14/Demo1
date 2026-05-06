import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//------add this phase 1
import { LoginComponent } from './pages/login/login.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { StudentFormComponent } from './pages/students/student-form/student-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AboutComponent } from './pages/about/about.component';
import { CareerComponent } from './pages/career/career.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'career', component: CareerComponent },

  {
    path: 'students',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StudentListComponent },
      { path: 'add', component: StudentFormComponent, canActivate: [RoleGuard] }
    ]
  },

  { path: '', redirectTo: 'about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
