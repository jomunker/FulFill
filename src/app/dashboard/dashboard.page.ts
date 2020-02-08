import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';
import { Task } from '../interfaces/task';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // public task: Task;

  // public myTime: string;

  constructor(private alertCtrl: AlertController, public tasksService: TasksService) {

    // this.task = {
    //   id: '',
    //   title: '',
    //   content: '',
    //   date: new Date(),
    //   time: new Date(),
    // };

    // this.myTime = this.tasksService.getTime(this.task.date)


  }

  ngOnInit() {
    this.tasksService.load();
  }


  // addTask(){

  //   this.alertCtrl.create({
  //     header: 'New Task',
  //     message: 'Type in your Task.',
  //     inputs: [
  //       {
  //         type: 'text',
  //         name: 'title'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel'
  //       },
  //       {
  //         text: 'Save',
  //         handler: (data) => {
  //           this.tasksService.createTask(data.title,'');
  //         }
  //       }
  //     ]
  //   }).then((alert) => {
  //     alert.present();
  //   });

  // }



}
