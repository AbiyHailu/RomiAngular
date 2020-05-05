import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"; 

@Component({
  selector: 'app-orderHistoy',
  templateUrl: './orderHistory.component.html'
})
export class  OrderHistoryComponent implements OnInit {
  adminData: string;
  constructor(
 //   private userService: UserService,
    private router: Router
  ) { }
  ngOnInit() {
  }

  navigateto(val) {
    this.router.navigate(['user/' + val]);
  }
}
