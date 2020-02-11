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

    // Return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // Get the tasks that were saved into storage
      this.storage.get('categories').then((categories) => {

        // Only set this.tasks to the returned value if there were values stored
        if (categories != null) {
          this.categories = categories;
        }

        // This allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);

      });

    });

  }

  save(): void {
    // Save the current array of tasks to storage
    this.storage.set('categories', this.categories);
  }

  getTask(id): Category {
    // Return the task that has an id matching the id passed in
    return this.categories.find(category => category.id === id);
  }

  createCategory(title): void {

    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.categories.map(category => parseInt(category.id)), 0) + 1;

    for (let i = 0; i < this.categories.length; i++) {
      if (title == this.categories[i].title) {
        console.log("The Categorie already exists!")
        return;
      }
    }

    if (title == "") {
      console.log("Please enter a Category!")
      return;
    }
    else {

      this.categories.push({
        id: id.toString(),
        title: title,
        //color: color,
      });

      this.save();
    }

  }

  deleteCategory(category): void {

    // Get the index in the array of the task that was passed in
    let index = this.categories.indexOf(category);

    // Delete that element of the array and resave the data
    if (index > -1) {
      this.categories.splice(index, 1);
      this.save();
    }

  }
}
