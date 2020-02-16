import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasks: Task[] = [];
  public loaded: boolean = false;


  constructor(public storage: Storage) { }

  load(): Promise<boolean> {

    // return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // get the tasks that were saved into storage
      this.storage.get('tasks').then((tasks) => {

        // only set this.tasks to the returned value if there were values stored
        if (tasks != null) {
          this.tasks = tasks;
        }

        // this allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);

      });

    });

  }

  save(): void {
    // save the current array of tasks to storage
    this.storage.set('tasks', this.tasks);
  }

  getTask(id): Task {
    // return the task that has an id matching the id passed in
    return this.tasks.find(task => task.id === id);
  }

  createTask(title, category, description, timed, notification, date, isoDate, time): void {

    // create a unique id that is one larger than the current largest id
    let id = Math.max(...this.tasks.map(task => parseInt(task.id)), 0) + 1;


    // check if a title is entered
    if (title == "") {
      console.log("Please enter your Task!");
      return;

    } // save task if title is entered
    else {

      this.tasks.push({
        id: id.toString(),
        title: title,
        category: category,
        content: description,
        timed: timed,
        notification: notification,
        date: date,
        isoDate: isoDate,
        time: time,
      });

      this.save();
    }

  }

  // delete a task
  deleteTask(task): void {

    // get the index in the array of the task that was passed in
    let index = this.tasks.indexOf(task);

    // delete that element of the array and resave the data
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.save();
    }

  }

}


