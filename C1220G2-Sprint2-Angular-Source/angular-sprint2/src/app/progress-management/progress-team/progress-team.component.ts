import {Component, OnInit} from '@angular/core';
import {ProgressDto} from '../progress-dto';
import {ProgressService} from '../progress.service';

@Component({
  selector: 'app-progress-team',
  templateUrl: './progress-team.component.html',
  styleUrls: ['./progress-team.component.css']
})
export class ProgressTeamComponent implements OnInit {

  progressDtoList: ProgressDto[];
  page = 1;
  pageSize = 5;

  constructor(private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.getAllProgressManagement();
  }

  getAllProgressManagement() {
    this.progressService.getAllProgressManagement().subscribe(result => {
      this.progressDtoList = result;
    });
  }

}
