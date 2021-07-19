import { Component, Input, OnInit } from '@angular/core';
import { FirebaseUser } from 'src/app/models/firebase-user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: FirebaseUser;
  
  constructor() { }

  ngOnInit(): void {
  }

}
