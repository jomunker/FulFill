import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { CategoriesService } from '../services/categories.service';
import { Location } from '@angular/common';
import { Task } from '../interfaces/task';
import { Category } from '../interfaces/category';

import { AlertController} from '@ionic/angular';



@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})

export class NewTaskPage implements OnInit {

  public task: Task;
  public category: Category;

  public taskTime = new Date();
  public taskDate = new Date();

  constructor(private tasksService: TasksService, private categoriesService: CategoriesService, private location: Location, private alertCtrl: AlertController) {

    this.task = {
      id: '',
      title: '',
      category: '',
      content: '',
      date: '',
      time: '',
    };

    this.category = {
      id: '',
      title: '',
    }



  }


  ngOnInit() { }

  addTask() {
    this.task.date = this.tasksService.getDate(this.taskDate);
    console.log(this.task.date);
    this.task.time = this.tasksService.getTime(this.taskTime);
    console.log(this.task.time);


    this.tasksService.createTask(this.task.title, this.task.category, this.task.content, this.task.date, this.task.time);
    console.log(this.task);

    this.location.back();
  }

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

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };


}
