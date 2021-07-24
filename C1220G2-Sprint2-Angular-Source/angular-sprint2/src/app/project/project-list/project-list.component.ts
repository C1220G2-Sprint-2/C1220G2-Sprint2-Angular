import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../project-service.service";
import {Router} from "@angular/router";
import {Project} from "../../models/project";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  private projectList: Project[] = [];
  private collectionSize = 0;
  page = 1;
  pageSize = 4;

  constructor(private projectService: ProjectServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  loadList(){
    this.projectService.findAll().subscribe(data => {
      this.projectList=data['content'];
      this.collectionSize =data['totalPages'];
    })
  }

  // setNameSearch($event: any) {
  //   this.nameSearch = $event.target.value;
  // }
  //
  // setFloorSearch($event: any) {
  //   this.floorSearch = $event.target.value;
  // }
  //
  // setStatusSearch($event: any) {
  //   this.statusSearch = $event.target.value;
  // }
  //
  // setCapacitySearch($event: any) {
  //   this.capacitySearch = $event.target.value;
  // }
  // listSearch(){
  //   this.messageSearch = '';
  //   this.meetingRoomService.findSearch(this.nameSearch, this.floorSearch, this.capacitySearch, this.statusSearch).subscribe(
  //     value => {
  //       this.meetingRoomList = value;
  //       if (this.meetingRoomList.length == 0){
  //         this.messageSearch = "Không tìm thấy phòng họp phù hợp."
  //       }
  //     }
  //   );
  //
  // }
  //
  // passData(id: number, name: string) {
  //   this.idDelete = id;
  //   this.nameDelete = name;
  // }
  //
  // deleteMeetingRoom() {
  //   this.meetingRoomService.deleteById(this.idDelete).subscribe(value => {
  //     this.listSearch();
  //   });
  //
  // }
}
