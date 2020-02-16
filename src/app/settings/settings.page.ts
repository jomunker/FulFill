import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public category: Category;

  constructor(private categoriesService: CategoriesService, private alertCtrl: AlertController) { }

  ngOnInit() {
    // load categories
    this.categoriesService.load();

  }

  // add a category vie alert
  addCategory() {

    this.alertCtrl.create({
      header: 'New Category',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.categoriesService.createCategory(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  // delete a category
  deleteCategory() {
    this.categoriesService.deleteCategory(this.category);
  }

  // save changes of a category
  categoryChanged() {
    this.categoriesService.save();
    console.log(this.category);
  }

}
