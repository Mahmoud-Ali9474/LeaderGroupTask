import { Router } from '@angular/router';
import { Product } from './../_models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filter: any = {
    tag: '',
    name: '',
  };
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }
  flatProductTags(product: Product) {
    return product.tags.map((k) => k.name).join(',');
  }
  getProducts() {
    console.log(this.filter);
    this.productService.getProducts(this.filter).subscribe(
      (data: any) => {
        this.products = data;
      },
      (err) => {
        if (err.status == 404) this.router.navigate(['/home']);
      }
    );
  }
}
