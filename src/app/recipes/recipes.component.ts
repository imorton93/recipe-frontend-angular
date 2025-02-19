import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  isModalOpen = false;

  constructor(private router: Router, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Open modal if any child route is active (i.e., new, :id, :id/edit)
        const childRouteActive = this.route.firstChild?.snapshot.url.length;
        this.isModalOpen = !!childRouteActive;
      });
  }


  onCloseModal() {
    this.router.navigate(['/recipes']); // Navigate back to close modal
  }

}
