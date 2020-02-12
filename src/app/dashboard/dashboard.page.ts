import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';
import { Task } from '../interfaces/task';

import { IonReorderGroup } from '@ionic/angular';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  reorderGroup: IonReorderGroup;

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

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
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
  

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
