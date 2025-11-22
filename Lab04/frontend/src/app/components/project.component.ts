import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  _id: string | null = null;
  name: string = '';
  dueDate: string = '';
  course: string = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }

  clearForm() {
    this._id = null;
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }

  addProject() {
    const newProject = { name: this.name, dueDate: this.dueDate, course: this.course };
    this.projectService.addProject(newProject).subscribe(() => {
      this.loadProjects();
      this.clearForm();
    });
  }

  selectProject(project: any) {
    this._id = project._id;
    this.name = project.name;
    this.dueDate = project.dueDate;
    this.course = project.course;
  }

  updateProject() {
    if (!this._id) return;
    const updatedProject = { _id: this._id, name: this.name, dueDate: this.dueDate, course: this.course };
    this.projectService.updateProject(updatedProject).subscribe(() => {
      this.loadProjects();
      this.clearForm();
    });
  }

  deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    this.projectService.deleteProject(id).subscribe(() => {
      this.loadProjects();
    });
  }
}