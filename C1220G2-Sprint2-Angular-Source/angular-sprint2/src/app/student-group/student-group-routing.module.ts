import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListStudentGroupComponent} from './list-student-group/list-student-group.component';
import {StudentGroupRegistrationComponent} from './student-group-registration/student-group-registration.component';


const routes: Routes = [
  {
    path: 'danh-sach',
    component: ListStudentGroupComponent
  }, {
    path: 'dang-ky',
    component: StudentGroupRegistrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGroupRoutingModule {
}
