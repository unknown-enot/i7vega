import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isAdmin: any;
  constructor(public auth: AuthService) { 
      this.isAdmin = auth.isInRole('Admin');
   }

  ngOnInit() {
    
  }

}