import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  @Input() project: any;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private projectService: ProjectService
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.project) {
      this.validateForm.patchValue(this.project);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.project) {
        this.projectService.updateProject(this.project.id, this.validateForm.value).subscribe(() => {
          this.modal.close(true);
        });
      } else {
        this.projectService.createProject(this.validateForm.value).subscribe(() => {
          this.modal.close(true);
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
