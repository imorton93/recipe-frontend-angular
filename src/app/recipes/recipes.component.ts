import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  isModalOpen = false;

  constructor(private router: Router, private route: ActivatedRoute) {  }

  ngOnInit() {
    // Handle case when component initializes (refresh/manual URL input)
    this.checkActiveChildRoute();

    // Handle route changes dynamically
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.checkActiveChildRoute());
  }

  checkActiveChildRoute() {
    this.isModalOpen = this.route.children.some(child => child.snapshot.url.length > 0);
  }


  onCloseModal() {
    this.router.navigate(['/recipes']); // Navigate back to close modal
  }

}
