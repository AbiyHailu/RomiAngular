import {Component, OnInit} from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  styleUrls: ['admin.component.css'],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  adminData: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit() {
  }
 
  navigateto(val) {
    this.router.navigate(['admin/'+val]); 
  }
}
