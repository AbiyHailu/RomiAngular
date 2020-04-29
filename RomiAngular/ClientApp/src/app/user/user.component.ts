import { Component, OnInit  } from "@angular/core";
import { UserService } from "../services/user.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userData: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  fetchUserData() {
    this.userService.getUserData().subscribe(
      (result: string) => {
        this.userData = result;
      }
    );
  }
}
