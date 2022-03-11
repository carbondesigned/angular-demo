import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/types';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  // emits event to parent component
  @Output() addTask = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please enter a task');
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // outputs the new task to parent component
    this.addTask.emit(newTask);

    // reset form
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
