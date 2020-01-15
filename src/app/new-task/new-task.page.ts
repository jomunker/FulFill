import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Location } from '@angular/common';
import { Task } from '../interfaces/task';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})

export class NewTaskPage implements OnInit {

  public task: Task;

  constructor(private tasksService: TasksService, private location: Location) {

    this.task = {
      id: '',
      title: '',
      content: ''
    };
  }

  ngOnInit() { }

  addTask() {
    this.tasksService.createTask(this.task.title,this.task.content);

    this.location.back();
  }

}
