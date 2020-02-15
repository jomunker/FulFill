import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { TasksService } from '../services/tasks.service';
import { CategoriesService } from '../services/categories.service';
import { PreferencesService } from '../services/preferences.service';

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
  
  constructor(private route: ActivatedRoute, private tasksService: TasksService, private categoriesService: CategoriesService, private location: Location, private alertCtrl: AlertController, private notifications: PreferencesService) {

    this.task = {
      id: '',
      title: '',
      category: '',
      content: '',
      timed: false,
      notification: false,
      date: '',
      isoDate: '',
      time: '',
    };

  }

  ngOnInit() {

    // Get the id of the note from the URL
    let taskId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if (this.tasksService.loaded) {
      this.task = this.tasksService.getTask(taskId)
    } else {
      this.tasksService.load().then(() => {
        this.task = this.tasksService.getTask(taskId)
      });
    }

    this.categoriesService.load();
  }

  dateChanged() {

    let dateString = parseISO(this.task.isoDate);
      this.task.date = format(dateString, 'dd.MM.yyyy')
      console.log(this.task.date);

    // let dateString = parseISO(this.task.date);
    // this.task.date = format(dateString, 'dd.MM.yyyy');
    // let dateString = new Date(this.task.date);
    // // let chund = parse(this.task.date, 'yyyy-MM-dd', new Date())
    // let chund = format(dateString, 'dd.MM.yyyy');
    // this.task.date = chund;

  }

  timeChanged() {
    // let timeString = parseISO(this.task.time);
    // console.log(this.task.time);
    // this.task.time = format(timeString, 'HH:mm')
    console.log(this.task.time);
  }


  taskChanged() {
    this.tasksService.save();
    console.log(this.task);
  }


  deleteTask() {
    this.tasksService.deleteTask(this.task);
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
  // setNotification() {
  //   this.notifications.init();
  //   if (this.task.time != '' || this.task.title != '') {
  //     this.notifications.scheduleOnce(this.task.time, this.task.title, this.task.content);
  //   }
  // }

  // initNotify() {
  //   this.notifications.init();
  // }

}


