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

  public taskTime = new Date();
  public taskDate = new Date();

  

  constructor(private tasksService: TasksService, private location: Location) {

    this.task = {
      id: '',
      title: '',
      content: '',
      date: '',
      time: '',
    };



  }


  ngOnInit() { }

  addTask() {
    this.task.date = this.tasksService.getDate(this.taskDate);
    console.log(this.task.date);
    this.task.time = this.tasksService.getTime(this.taskTime);
    console.log(this.task.time);   


    this.tasksService.createTask(this.task.title,this.task.content,this.task.date,this.task.time);

    this.location.back();
  }

}
