import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  subscribe = new Subscription();
  currentUser$ = this.userService.currentUser$;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscribe.add(this.userService.getCurrentUser().subscribe());
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
