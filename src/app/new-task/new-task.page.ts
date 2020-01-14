import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  saveTask(value: { title: string }) {
    this.tasksService.saveTask(value);
  }

  getTasks(){

  }

}
