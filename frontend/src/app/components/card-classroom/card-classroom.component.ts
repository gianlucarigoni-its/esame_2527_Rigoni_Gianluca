import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Classroom } from '../../utils/interfaces/classroom';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  imports: [RouterLink, AvatarComponent],
  selector: 'app-card-classroom',
  styleUrl: './card-classroom.component.css',
  templateUrl: './card-classroom.component.html',
})
export class CardClassroomComponent {
  classroom = input.required<Classroom>();
}
