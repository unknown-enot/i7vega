import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
    
  isExpanded = false;

  constructor(private auth: AuthService){
      
  }

  ngOnInit(){
    
  }



  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }    

}
