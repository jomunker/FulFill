import { Component, OnInit } from '@angular/core';

import { TasksService } from '../services/tasks.service';
import { CategoriesService } from '../services/categories.service';
import { PreferencesService } from '../services/preferences.service';

import { Location } from '@angular/common';

import { Task } from '../interfaces/task';
import { Category } from '../interfaces/category';
import { subDays, format, parseISO } from 'date-fns'


import { AlertController } from '@ionic/angular';

import {
  LocalNotificationsPlugin,
  LocalNotificationEnabledResult,
  LocalNotificationPendingList,
  LocalNotificationActionType,
  LocalNotification,
  LocalNotificationScheduleResult
} from '@capacitor/core';

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

  //public notification: LocalNotification;

  constructor(private tasksService: TasksService, private categoriesService: CategoriesService, private location: Location, private alertCtrl: AlertController, private notifications: PreferencesService) {

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

    this.category = {
      id: '',
      title: '',
    }



  }


  ngOnInit() {
    var now = new Date();
    let chund = new Date(now.getTime() + (10 * 1000));
    console.log(chund)
  }

  // time(isoTime) {
  //   this.task.time = this.tasksService.getDate(isoTime);
  //   console.log(this.tasksService.getDate(isoTime));
  // }

  // date(isoDate) {
  //   this.task.date = this.tasksService.getDate(isoDate);
  //   console.log(this.tasksService.getDate(isoDate));
  // }

  addTask() {

    console.log(this.task.time);
    console.log(this.task.date);

    if (this.task.time) {
      let timeString = parseISO(this.task.time);
      this.task.time = format(timeString, 'HH:mm')
      console.log(this.task.time);
    } else {
      this.task.time = "";

    }



    if (this.task.isoDate) {
      let dateString = parseISO(this.task.isoDate);
      this.task.date = format(dateString, 'dd.MM.yyyy')
      console.log(this.task.date);

    } else {
      this.task.isoDate = "";
      this.task.date = "";
    }


    // this.task.date = this.tasksService.getTime(this.taskTime);
    //   console.log(this.task.date);
    // this.task.time = this.tasksService.getTime(this.taskTime);
    // console.log(this.task.time);


    this.tasksService.createTask(this.task.title, this.task.category, this.task.content, this.task.timed, this.task.notification, this.task.date, this.task.isoDate, this.task.time);
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


  setNotification() {
      this.notifications.dailyNotification();
    
  }



  // LocalNotifications.schedule({
  //   notifications: [
  //     {
  //       title: "Title",
  //       body: "Body",
  //       id: 1,
  //       schedule: { at: new Date(Date.now() + 1000 * 5) },
  //       sound: null,
  //       attachments: null,
  //       actionTypeId: "",
  //       extra: null
  //     }
  //   ]
  // });


}
