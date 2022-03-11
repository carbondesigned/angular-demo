// service used for separation of concern and handles all logic dealing with task.
// i.e. potential service for auth, etc.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/types';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  // get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // delete task
  deleteTask(task: Task): Observable<Task> {
    const taskItemId = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(taskItemId);
  }

  // update task
  updateTask(task: Task): Observable<Task> {
    const taskItemId = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(taskItemId, task, httpOptions);
  }

  // add a task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
