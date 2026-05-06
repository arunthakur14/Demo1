import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {

  students: any[] = [];

  constructor(private service: StudentService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.students = res);
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.load());
  }
}