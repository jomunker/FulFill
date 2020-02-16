import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },

  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule) },

  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksPageModule) },

  { path: "tasks/:id", loadChildren: "./details/details.module#DetailsPageModule" },

  { path: 'new-task', loadChildren: () => import('./new-task/new-task.module').then(m => m.NewTaskPageModule) },
  
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule) },

  { path: 'details', loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule) },

  { path: 'category', loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule) },

  { path: "category/:id", loadChildren: "./category/category.module#CategoryPageModule" },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
