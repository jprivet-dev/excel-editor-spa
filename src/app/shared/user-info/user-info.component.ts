import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private subscribe = new Subscription();
  currentUser$ = this.userService.user$;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscribe.add(this.userService.retrieveUser().subscribe());
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
