import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../interfaces/task';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
 
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public task: Task;

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private location: Location) { 

    this.task = {
      id: '',
      title: '',
      content: ''
    };

  }

  ngOnInit() {

    // Get the id of the note from the URL
    let taskId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if(this.tasksService.loaded){
      this.task = this.tasksService.getNote(taskId)
    } else {
      this.tasksService.load().then(() => {
        this.task = this.tasksService.getNote(taskId)
      });
    }

  }

  taskChanged(){
    this.tasksService.save();
  }

  deleteTask(){
    this.tasksService.deleteNote(this.task);
    this.location.back();
  }

}


