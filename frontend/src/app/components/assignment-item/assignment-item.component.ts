import { DatePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { Assignment } from '../../utils/interfaces/assignment';

@Component({
  selector: 'app-assignment-item',
  imports: [DatePipe, NgbProgressbar],
  styleUrl: './assignment-item.component.css',
  templateUrl: './assignment-item.component.html',
})
export class AssignmentItemComponent {
  assignment = input.required<Assignment>();
  isStudent = input(false);

  completed = input(false);
  complete = output<string>();

  allDone = computed(
    () => this.assignment().completedCount === this.assignment().studentsCount,
  );

  completeAssignment(id: string) {
    this.complete.emit(id);
  }
}
