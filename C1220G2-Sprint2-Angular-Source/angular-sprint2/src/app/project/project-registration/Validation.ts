import {AbstractControl, ValidationErrors} from '@angular/forms';
import {TeamService} from "../../student-group/team.service";

export class Validation {

  private static teamService: TeamService;

  constructor(private  teamService: TeamService) {
  }



}
