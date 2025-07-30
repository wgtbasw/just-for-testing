import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];

  constructor(
    private modalService: NzModalService,
    private router: Router,
    private projectService: ProjectService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  showTaskModal(task?: any): void {
    const modal = this.modalService.create({
      nzTitle: task ? 'Edit task' : 'Create a new task',
      nzContent: TaskFormComponent,
      nzComponentParams: {
        initialData: task,
        projects: this.projects
      },
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        // Refresh the task list
      }
    });
  }

  showProjectModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create a new project',
      nzContent: ProjectFormComponent,
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
