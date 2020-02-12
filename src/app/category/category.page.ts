import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { CategoriesService } from '../services/categories.service';
import { Task } from '../interfaces/task';
import { Category } from '../interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  public task: Task;
  public category: Category;

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private categoriesService: CategoriesService, private location: Location) {

    this.task = {
      id: '',
      title: '',
      category: '',
      content: '',
      timed: false,
      notification: false,
      date: '',
      time: '',
    };

    this.category = {
      id: '',
      title: '',
    }
  }

  ngOnInit() {

    let categoryId = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if (this.categoriesService.loaded) {
      this.category = this.categoriesService.getTask(categoryId)
    } else {
      this.categoriesService.load().then(() => {
        this.category = this.categoriesService.getTask(categoryId)
      });
    }

      // Get the id of the note from the URL
      let taskId = this.route.snapshot.paramMap.get('id');

      // Check that the data is loaded before getting the note
      // This handles the case where the detail page is loaded directly via the URL
      if (this.tasksService.loaded) {
        this.task = this.tasksService.getTask(taskId)
      } else {
        this.tasksService.load().then(() => {
          this.task = this.tasksService.getTask(taskId)
        });
      }
      this.tasksService.load();


    }

    taskChanged(){
      this.tasksService.save();
      console.log(this.task);
    }

    deleteCategory(){
      this.categoriesService.deleteCategory(this.category);
      this.location.back();
    }

    categoryChanged(){
      this.categoriesService.save();
      console.log(this.category);
    }

  }
