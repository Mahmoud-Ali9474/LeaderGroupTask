import { SaveCategory } from '../_models/save-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class CategoryService {
  private readonly categoryEndpoint: string = 'api/category/';

  constructor(private httpClient: HttpClient) {}

  create(category: SaveCategory) {
    return this.httpClient.post(
      environment.baseUrl + this.categoryEndpoint,
      category
    );
  }

  getCategory(id: number) {
    return this.httpClient.get(
      environment.baseUrl + this.categoryEndpoint + id
    );
  }

  getCategories(filter: any) {
    let url = environment.baseUrl + this.categoryEndpoint + 'getall';
    console.log(url);
    return this.httpClient.get(url + '?' + this.toQueryString(filter));
  }

  toQueryString(filter: any) {
    var parts = [];
    for (var property in filter) {
      var value = filter[property];
      if (value != null && value != undefined)
        parts.push(
          encodeURIComponent(property) + '=' + encodeURIComponent(value)
        );
    }

    return parts.join('&');
  }

  update(category: SaveCategory) {
    return this.httpClient.put(
      environment.baseUrl + this.categoryEndpoint + category.id,
      category
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      environment.baseUrl + this.categoryEndpoint + id
    );
  }
}
