import {Component, OnInit} from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  adminData: string;
  constructor(private userService: UserService) { }
  ngOnInit() {
  }
  fetchAdminData() {
    this.userService.getAdminData().subscribe(
      (result: string) => {
        this.adminData = result;
      }
    );
  }
}
