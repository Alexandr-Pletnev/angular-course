import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private route: Router,
    public auth : AuthService,
    ) { }

  ngOnInit(): void {
  }

  logout(e: Event) {
    e.preventDefault();
    this.auth.logout();
    this.route.navigate(['/admin', 'login'])
  }

}
