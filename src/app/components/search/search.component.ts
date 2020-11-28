import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchField: FormControl;

  constructor(
    // private data: DataService,
    private searchService: SearchService,
    private loc: Location,
    private route: Router
  ) {
    console.log('route: ');

    this.searchField = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.searchForm = new FormGroup({
      searchField: this.searchField,
    });
  }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe((message: object) => {
      console.log('SearchComponent', message);
    });

    this.searchField.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((term) => {
          if (term.length >= 3) {
            if (this.loc.path()) {
              this.route.navigate(['/']);
            }
            return this.searchService.getUserByName(term).pipe(
              switchMap(({ items }) => {
                const obs$ = items.map((item: any) => {
                  return this.searchService.getUserByURL(item.url);
                });
                return forkJoin(obs$).pipe(
                  mergeMap((joined) => {
                    return of(joined);
                  })
                );
              })
            );
          }
          return of(null);
        })
      )
      .subscribe((data: any) => {
        console.log('searchField:', data);
        this.searchService.changeMessage(data || []);
      });
  }
}
