import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly tagEndpoint: string = 'api/tag/';

  constructor(private httpClient: HttpClient) {}
  getTags() {
    let url = environment.baseUrl + this.tagEndpoint + 'getall';
    return this.httpClient.get(url);
  }
}
