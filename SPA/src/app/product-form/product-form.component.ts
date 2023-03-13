import { KeyValuePair } from './../_models/key-value-pair';
import { SaveCategory } from './../_models/save-category';
import { Product } from './../_models/product';
import { ProductService } from './../_services/product.service';
import { SaveProduct } from './../_models/save-product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../_services/category.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories: SaveCategory[] = [];
  tags: KeyValuePair[] | any[] = [];
  productTags: number[] = [];
  productCategoryId: number = 0;
  product: SaveProduct = {
    id: 0,
    title: '',
    desc: '',
    price: 0,
    quantity: 0,
    categoryId: undefined,
    tags: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastyService: ToastrService
  ) {
    route.params.subscribe((p) => {
      this.product.id = +p['id'] || 0;
    });
  }

  ngOnInit() {
    let source: any = {
      categories: this.categoryService.getCategories({}),
    };
    if (this.product.id)
      source.product = this.productService.getProduct(this.product.id);

    forkJoin(source).subscribe(
      (data: any) => {
        this.categories = data.categories;

        if (this.product.id) {
          this.setProduct(data.product);
          this.productTags = this.product.tags;
          this.productCategoryId = this.product.categoryId!;
          this.populateTags();
        }
      },
      (err) => {
        if (err.status == 404) this.router.navigate(['/home']);
      }
    );
  }

  private setProduct(p: Product) {
    this.product.id = p.id;
    this.product.categoryId = p.category.id;
    this.product.title = p.title;
    this.product.desc = p.desc;
    this.product.price = p.price;
    this.product.quantity = p.quantity;

    this.product.tags = p.tags.map((t) => t.id);
  }

  onCategoryChange() {
    this.populateTags();
  }

  private populateTags() {
    var selectedCategory: SaveCategory | undefined = this.categories.find(
      (m) => m.id == this.product.categoryId
    );
    this.tags = selectedCategory ? selectedCategory.tags : [];
    if (this.product.categoryId == this.productCategoryId)
      this.product.tags = this.productTags;
    else this.product.tags = [];
  }

  onTagToggle(tagId: any, $event: any) {
    if ($event.target.checked) this.product.tags.push(tagId);
    else {
      var index = this.product.tags.indexOf(tagId);
      this.product.tags.splice(index, 1);
    }
  }

  submit() {
    var result$ = this.product.id
      ? this.productService.update(this.product)
      : this.productService.create(this.product);
    result$.subscribe((product) => {
      this.toastyService.success('Product saved successfully.');
      this.router.navigate(['/admin/products']);
    });
  }
  delete(id: number) {
    this.productService.delete(id).subscribe((id) => {
      this.router.navigate(['/admin/products']);
    });
  }
}
