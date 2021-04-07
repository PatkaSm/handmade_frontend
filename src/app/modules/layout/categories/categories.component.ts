import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from 'src/app/core/enums/category';
import { ICategory } from 'src/app/core/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  /**
   * Tree control
   */
  treeControl = new NestedTreeControl<ICategory>((node) => node.children);

  /**
   * Tree data
   */
  dataSource = new MatTreeNestedDataSource<ICategory>();

  /**
   * Category component constructor
   * @param categoryService Category service
   */
  constructor(private categoryService: CategoryService) {}

  /**
   * On init get categories
   */
  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Get categories
   */
  getCategories() {
    this.categoryService.getNavCategories().subscribe((resp) => {
      this.dataSource.data = resp as any;
    });
  }

  /**
   * Check if has child
   * @param _
   * @param node category
   * @returns {boolean} return if category have children
   */
  hasChild = (_: number, node: ICategory) => {
    if (node.name !== Category.All) {
      return !!node.children && node.children.length > 0;
    } else {
      return false;
    }
  };
}
