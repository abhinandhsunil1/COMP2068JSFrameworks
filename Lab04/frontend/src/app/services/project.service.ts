import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(`${environment.ServerAPI}api/projects`);
  }

  addProject(newProject: any) {
    return this.http.post(`${environment.ServerAPI}api/projects`, newProject);
  }

  deleteProject(id: string) {
    return this.http.delete(`${environment.ServerAPI}api/projects/${id}`);
  }

  updateProject(project: any) {
    return this.http.put(`${environment.ServerAPI}api/projects/${project._id}`, project);
  }
}