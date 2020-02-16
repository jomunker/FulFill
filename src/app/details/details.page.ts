import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TasksService } from '../services/tasks.service';
import { CategoriesService } from '../services/categories.service';

import { Task } from '../interfaces/task';
import { Category } from '../interfaces/category';

import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';
import { parseISO, format, parse, toDate } from 'date-fns';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public task: Task;
  public category: Category;

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private categoriesService: CategoriesService, private location: Location, private alertCtrl: AlertController) {

    this.task = {
      id: '',
      title: '',
      category: '',
      content: '',
      timed: false,
      date: '',
      isoDate: '',
      time: '',
    };

  }

  ngOnInit() {

    console.log(this.task)

    // get the id of the task from the URL
    let taskId = this.route.snapshot.paramMap.get('id');

    // check that the data is loaded before getting the task
    // this handles the case where the detail page is loaded directly via the URL
    if (this.tasksService.loaded) {
      this.task = this.tasksService.getTask(taskId);
    } else {
      this.tasksService.load().then(() => {
        this.task = this.tasksService.getTask(taskId);
      });
    }

    // load categories
    this.categoriesService.load();
  }

  // parse date if changed
  dateChanged() {
    let dateString = parseISO(this.task.isoDate);
    this.task.date = format(dateString, 'dd.MM.yyyy');
    console.log(this.task.date);
  }

  // save task
  taskChanged() {
    this.tasksService.save();
    console.log(this.task);
  }

  // delete task
  deleteTask() {
    this.tasksService.deleteTask(this.task);
    this.location.back();
  }

  // create category via alert 
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

}


