import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
interface ICategory {
  id?: number;
  name?: string;
  children: ICategory[];
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories = [];
  category: ICategory;
  treeControl = new NestedTreeControl<ICategory>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<ICategory>();
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getNavCategories().subscribe((resp) => {
      this.dataSource.data = resp;
    });
  }

  test($event, category) {
    console.log($event, category);
  }

  hasChild = (_: number, node: ICategory) => {
    if (node.name !== 'Wszystko') {
      return !!node.children && node.children.length > 0;
    } else {
      return false;
    }
  };

  showCategories(categoriesRef) {
    categoriesRef.classList.toggle('categories-active');
  }

  hideCategories(categoriesRef) {
    categoriesRef.classList.toggle('categories-active');
  }
}
