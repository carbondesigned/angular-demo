import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/types';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  // constructor arg to give the ability to use the task service
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      this.tasks[index] = updatedTask;
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks.push(newTask);
    });
  }
}
