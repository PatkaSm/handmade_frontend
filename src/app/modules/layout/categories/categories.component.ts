import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';

interface ICategory {
  id?: number;
  name?: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories = [];
  category: ICategory;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  getCategories() {
    this.categoryService.getNavCategories().subscribe((resp) => {
      this.categories = resp;
      console.log(resp);
    });
  }
}
