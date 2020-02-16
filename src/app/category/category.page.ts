import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  public category: Category;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private location: Location) {

    this.category = {
      id: '',
      title: '',
    }
  }

  ngOnInit() {

    // get the id of the category from the URL
    let categoryId = this.route.snapshot.paramMap.get('id');

    // check that the data is loaded before getting the categories
    // this handles the case where the detail page is loaded directly via the URL
    if (this.categoriesService.loaded) {
      this.category = this.categoriesService.getTask(categoryId)
    } else {
      this.categoriesService.load().then(() => {
        this.category = this.categoriesService.getTask(categoryId)
      });
    }

  }

  // delete category
  deleteCategory() {
    this.categoriesService.deleteCategory(this.category);
    this.location.back();
  }

  // save category if changes were made
  categoryChanged() {
    this.categoriesService.save();
    console.log(this.category);
  }

}
