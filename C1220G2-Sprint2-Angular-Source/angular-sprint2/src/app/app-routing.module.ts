import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  // ---------------------------- Kha code
  {
    path: 'trao-doi',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'thong-ke',
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  // -----------------------------
  {
    path: '',
    loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'hoc-sinh',
    loadChildren: () => import('./student/student.module').then(module => module.StudentModule)
  },
  {
    path: 'nhom',
    loadChildren: () => import('./student-group/student-group.module').then(module => module.StudentGroupModule)

  },
  {
    path: 'de-tai',
    loadChildren: () => import('./project/project.module').then(module => module.ProjectModule)
  },

  // code by sang
  {path: 'quan-ly-tien-do', loadChildren: () => import('./progress-management/progress-management.module').then(module => module.ProgressManagementModule)},

  // end code by sang
  // code by hau

  {
    path: 'bao-cao-tien-do',
    loadChildren: () => import('./report-progress/report-progress.module').then(module => module.ReportProgressModule)
  },
  //code by Tam
  {
    path: 'giang-vien',
    loadChildren: () => import('./teacher/teacher.module').then(module => module.TeacherModule)
  },
  {
    path: 'excel',
    loadChildren: () => import('./manager-add-excel/manager-add-excel.module').then(module => module.ManagerAddExcelModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
