import { Category } from './../_models/category';
import { TagService } from './../_services/tag.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { KeyValuePair } from '../_models/key-value-pair';
import { SaveCategory } from '../_models/save-category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  tags: KeyValuePair[] | any[] = [];
  category: SaveCategory = {
    id: 0,
    name: '',
    tags: [],
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService,
    private categoryService: CategoryService,
    private toastyService: ToastrService
  ) {
    route.params.subscribe((p) => {
      this.category.id = +p['id'] || 0;
    });
  }

  ngOnInit(): void {
    let source: any = {
      tags: this.tagService.getTags(),
    };
    if (this.category.id)
      source.product = this.categoryService.getCategory(this.category.id);

    forkJoin(source).subscribe(
      (data: any) => {
        this.tags = data.tags;

        if (this.category.id) {
          this.setCategory(data.product);
        }
      },
      (err) => {
        if (err.status == 404) this.router.navigate(['/home']);
      }
    );
  }
  private setCategory(c: Category) {
    this.category.id = c.id;
    this.category.name = c.name;
    this.category.tags = c.tags.map((t) => t.id);
  }
  onTagToggle(tagId: any, $event: any) {
    if ($event.target.checked) this.category.tags.push(tagId);
    else {
      var index = this.category.tags.indexOf(tagId);
      this.category.tags.splice(index, 1);
    }
  }
  submit() {
    var result$ = this.category.id
      ? this.categoryService.update(this.category)
      : this.categoryService.create(this.category);
    result$.subscribe((category) => {
      this.toastyService.success('Category saved successfully.');
      this.router.navigate(['/categories']);
    });
  }
  delete(id: number) {
    this.categoryService.delete(id).subscribe((id) => {
      this.toastyService.success('Category deleted successfully.');
      this.router.navigate(['/categories']);
    });
  }
}
