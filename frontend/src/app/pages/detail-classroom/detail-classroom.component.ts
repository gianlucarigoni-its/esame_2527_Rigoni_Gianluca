import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AssignmentItemComponent } from '../../components/assignment-item/assignment-item.component';
import { AssignmentService } from '../../services/assignment.service';
import { AuthService } from '../../services/auth.service';
import { ClassroomService } from '../../services/classroom.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAssignmentModalComponent } from '../../components/create-assignment-modal/create-assignment-modal.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [AssignmentItemComponent],
  selector: 'app-detail-classroom',
  styleUrl: './detail-classroom.component.css',
  templateUrl: './detail-classroom.component.html',
})
export class DetailClassroomComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected classroomSrv = inject(ClassroomService);
  protected assignmentSrv = inject(AssignmentService);
  protected authSrv = inject(AuthService);

  private modalSrv = inject(NgbModal);
  private titleSrv = inject(Title);

  id = toSignal(this.activatedRoute.params.pipe(map((p) => p['id'] as string)));

  classroom = computed(() => {
    const id = this.id();
    return id ? this.classroomSrv.getById(id) : undefined;
  });

  assignments = computed(() =>
    [...this.assignmentSrv.assignments()].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    ),
  );

  isStudent = computed(() => this.authSrv.currentUser()?.role === 'student');

  accessDenied = signal(false);
  completeError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) {
        untracked(() => {
          this.assignmentSrv.getAssignments(id).subscribe({
            error: () => this.accessDenied.set(true),
          });
        });
      }
    });

    effect(() => {
      const name = this.classroom()?.name;
      if (name) this.titleSrv.setTitle(`${name} · Attività`);
    });
  }

  onComplete(assignmentId: string) {
    const id = this.id();
    if (!id) return;
    this.completeError.set(null);
    this.assignmentSrv.complete(id, assignmentId).subscribe({
      error: () =>
        this.completeError.set("Impossibile completare l'attività. Riprova."),
    });
  }

  openModal() {
    if (this.modalSrv.hasOpenModals()) return;

    const id = this.id();
    if (!id) return;
    const ref = this.modalSrv.open(CreateAssignmentModalComponent);
    ref.componentInstance.classroomId = id;
  }

  async askComplete(assignmentId: string) {
    if (this.modalSrv.hasOpenModals()) return;

    const ref = this.modalSrv.open(ConfirmModalComponent);
    ref.componentInstance.title = 'Completa attività';
    ref.componentInstance.message =
      'Vuoi segnare questa attività come completata? Non potrai annullare.';
    ref.componentInstance.confirmLabel = 'Completa';

    try {
      await ref.result;
    } catch {
      return;
    }
    this.onComplete(assignmentId);
  }
}
