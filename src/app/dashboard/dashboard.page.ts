import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';

import { subDays, format, parseISO, formatISO } from 'date-fns'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  today = new Date();
  todayString = formatISO(this.today);

  constructor(private alertCtrl: AlertController, public tasksService: TasksService) { }


  ngOnInit() {
    // load tasks
    this.tasksService.load();

    this.getToday();
  }

  // get the date string for today
  getToday() {

    this.today = parseISO(this.todayString);
    this.todayString = format(this.today, 'dd.MM.yyyy');
  }

  // delete Task
  delete(task) {
    console.log(task);
    this.tasksService.deleteTask(task);
  }

  // show next day on dashboard
  nextDay() {
    this.today = subDays(this.today, -1);
    this.todayString = formatISO(this.today);
    this.today = parseISO(this.todayString);
    this.todayString = format(this.today, 'dd.MM.yyyy');
    console.log(this.todayString);
  }

  // show previous day on dashboard
  prevDay() {
    this.today = subDays(this.today, 1);
    this.todayString = formatISO(this.today);
    this.today = parseISO(this.todayString);
    this.todayString = format(this.today, 'dd.MM.yyyy');
    console.log(this.todayString);
  }

}
