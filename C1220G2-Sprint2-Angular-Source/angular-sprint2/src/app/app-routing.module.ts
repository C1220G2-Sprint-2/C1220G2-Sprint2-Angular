import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  {
    path: 'trao-doi',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'thong-ke',
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
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
export class AppRoutingModule { }
