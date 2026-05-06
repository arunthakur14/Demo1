import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/models/student';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private apiUrl = 'https://localhost:7149/api/Student';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  create(student: Student) {
    return this.http.post(this.apiUrl, student);
  }

  update(id: number, student: Student) {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}