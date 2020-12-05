import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { SearchService } from './../../services/search.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: any;
  repos$ = of(null);
  followers$ = of(null);
  private subscript!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get('username'));
    const userName = this.route.snapshot.params.username;
    if (!userName) {
      return;
    }

    this.subscript = this.searchService.getUserDetails(userName).subscribe((data) => {
      if (data) {
        this.user = data;
        this.repos$ = this.searchService.getUserByURL(data.repos_url);
        this.followers$ = this.searchService.getUserByURL(data.followers_url);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscript.unsubscribe();
  }
}
