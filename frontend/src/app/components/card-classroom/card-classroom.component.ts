import { Component, input, output } from '@angular/core';
import { Classroom } from '../../utils/types/classroom.type';

@Component({
  imports: [],
  selector: 'app-card-classroom',
  styleUrl: './card-classroom.component.css',
  templateUrl: './card-classroom.component.html',
})
export class CardClassroomComponent {
  classroom = input.required<Classroom>();

  selected = output<void>();
}
