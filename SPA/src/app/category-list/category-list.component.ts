import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_models/category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  filter: any = {
    searchTerm: '',
  };
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  flatCategoriesTags(category: Category) {
    return category.tags.map((k) => k.name).join(',');
  }
  getCategories() {
    console.log(this.filter);
    this.categoryService.getCategories(this.filter).subscribe(
      (data: any) => {
        this.categories = data;
      },
      (err) => {
        if (err.status == 404) this.router.navigate(['/home']);
      }
    );
  }
}
