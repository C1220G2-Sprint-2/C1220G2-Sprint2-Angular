import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import {TeamService} from "../student-group/team.service";


@NgModule({
  declarations: [HeaderComponent, SidenavComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [HeaderComponent, SidenavComponent, FooterComponent,],

})
export class SharedModule { }
