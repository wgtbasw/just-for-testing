import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  @Input() projects: string[] = [];
  @Input() initialData: any;
  @Output() save = new EventEmitter<any>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.initialData?.title || '', Validators.required],
      description: [this.initialData?.description || ''],
      dueDate: [this.initialData?.dueDate || null],
      priority: [this.initialData?.priority || 'medium'],
      project: [this.initialData?.project || ''],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value);
    }
  }
}
