import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-admain-product-list',
  templateUrl: './admain-product-list.component.html',
  styleUrls: ['./admain-product-list.component.css'],
})
export class AdmainProductListComponent implements OnInit {
  products: Product[] = [];
  chechList: number[] = [];
  filter: any = {
    tag: '',
    name: '',
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  flatProductTags(product: Product) {
    return product.tags.map((k) => k.name).join(',');
  }
  getProducts() {
    this.productService.getProducts(this.filter).subscribe(
      (data: any) => {
        this.products = data;
      },
      (err: any) => {
        if (err.status == 404) this.router.navigate(['/home']);
      }
    );
  }
  onChechboxChange(id: number, $event: any) {
    console.log(id);
    if ($event.target.checked) this.chechList.push(id);
    else {
      var index = this.chechList.indexOf(id);
      this.chechList.splice(index, 1);
    }
  }
  onSelectAll($event: any) {
    debugger;
    if ($event.target.checked) this.chechList = this.products.map((p) => p.id);
    else this.chechList = [];
  }
  deleteMany() {
    if (this.chechList.length == 0) return;
    this.productService.deleteMany(this.chechList).subscribe((ids: any) => {
      ids.forEach((id: any) => {
        var idx = this.products.findIndex((p) => p.id == id);
        this.products.splice(idx, 1);
        this.chechList = [];
      });
      this.toastrService.success('Products deleted successfully.');
    });
  }
}
