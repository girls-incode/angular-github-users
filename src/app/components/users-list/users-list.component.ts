import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { User } from './../../models/user';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe((res) => {
      if (res.length) {
        this.users = res;
      } else {
        // this.users = [];
        this.getUsers();
      }
    });
  }

  getUsers(): void {
    this.searchService
      .getAllUsers()
      .pipe(
        switchMap((data) => {
          const obs$ = data.map((item: any) => {
            return this.searchService.getUserByURL(item.url);
          });
          return forkJoin(obs$).pipe(
            mergeMap((joined) => {
              return of(joined);
            })
          );
        })
      )
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  getColor = (num: number) =>
    num < 50 ? 'text-danger' : num > 1500 ? 'text-success' : 'text-warning';
}
