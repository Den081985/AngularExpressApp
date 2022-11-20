import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/classes/ICategory';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  $categories!: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.$categories = this.categoryService.fetch();
  }
}
