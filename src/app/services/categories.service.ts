import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories: Category[] = [];
  public loaded: boolean = false;


  constructor(public storage: Storage) { }


  load(): Promise<boolean> {

    // return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // get the categories that were saved into storage
      this.storage.get('categories').then((categories) => {

        // only set this.categories to the returned value if there were values stored
        if (categories != null) {
          this.categories = categories;
        }

        // this allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);

      });

    });

  }

  save(): void {
    // save the current array of categories to storage
    this.storage.set('categories', this.categories);
  }

  getTask(id): Category {
    // return the category that has an id matching the id passed in
    return this.categories.find(category => category.id === id);
  }

  createCategory(title): void {
    // create a unique id that is one larger than the current largest id
    let id = Math.max(...this.categories.map(category => parseInt(category.id)), 0) + 1;

    // check if the category name already exists
    for (let i = 0; i < this.categories.length; i++) {
      if (title == this.categories[i].title) {
        console.log("The Categorie already exists!")
        return;
      }
    }

    // check if a title is entered
    if (title == "") {
      console.log("Please enter a Category!")
      return;
    } // save categorie
    else {
      this.categories.push({
        id: id.toString(),
        title: title,
      });

      this.save();
    }

  }

  // delete a category
  deleteCategory(category): void {
    // get the index in the array of the category that was passed in
    let index = this.categories.indexOf(category);

    // delete that element of the array and resave the data
    if (index > -1) {
      this.categories.splice(index, 1);
      this.save();
    }
  }
}
