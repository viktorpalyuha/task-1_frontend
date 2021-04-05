import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  redirectToQuery(event: string) {
    if (!event) {
      this.router.navigate([], {
        relativeTo: this.activeRoute,
      });
    } else {
      this.router.navigate(['games'], {
        queryParams: {
          name: event,
        },
      });
    }
  }
}
