import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Classroom } from '../../utils/types/classroom.type';

@Component({
  imports: [RouterLink],
  selector: 'app-card-classroom',
  styleUrl: './card-classroom.component.css',
  templateUrl: './card-classroom.component.html',
})
export class CardClassroomComponent {
  classroom = input.required<Classroom>();
}
