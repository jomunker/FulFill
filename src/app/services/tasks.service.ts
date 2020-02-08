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

    // Return a promise so that we know when this operation has completed
    return new Promise((resolve) => {

      // Get the tasks that were saved into storage
      this.storage.get('tasks').then((tasks) => {

        // Only set this.tasks to the returned value if there were values stored
        if (tasks != null) {
          this.tasks = tasks;
        }

        // This allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);

      });

    });

  }

  save(): void {
    // Save the current array of tasks to storage
    this.storage.set('tasks', this.tasks);
  }

  getTask(id): Task {
    // Return the task that has an id matching the id passed in
    return this.tasks.find(task => task.id === id);
  }

  createTask(title,description,date,time): void {

    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.tasks.map(task => parseInt(task.id)), 0) + 1;



    if (title == "") {
      console.log("Please enter your Task!")
      
    } else {

      this.tasks.push({
        id: id.toString(),
        title: title,
        content: description,
        date: date,
        time: time,
      });

      this.save();
    }

  }

  getDate(date) {

    let options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }

    return date.toLocaleString('de-en', options);
  }

  getTime(time) {

    let options = {
      hour: 'numeric',
      minute: 'numeric'
    }

    return time.toLocaleString('de-en', options);
  }

  deleteTask(task): void {

    // Get the index in the array of the task that was passed in
    let index = this.tasks.indexOf(task);

    // Delete that element of the array and resave the data
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.save();
    }

  }

}


