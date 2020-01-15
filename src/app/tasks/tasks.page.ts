import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular'


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(private alertCtrl: AlertController, public tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.load();
  }

  addTask(){

    this.alertCtrl.create({
      header: 'New Task',
      message: 'Type in your Task.',
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
            this.tasksService.createTask(data.title,'');
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

  }

}
