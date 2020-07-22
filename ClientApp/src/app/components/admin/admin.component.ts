import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    template: "<h1>Admin</h1>"
})

export class AdminComponent implements OnInit {
    constructor(private auth: AuthService ) {

    }

    ngOnInit() { }
}