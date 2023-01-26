import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  user$ = this.userService.user$;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.retrieveUser().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
