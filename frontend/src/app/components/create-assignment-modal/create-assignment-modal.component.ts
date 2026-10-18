import { Component, computed, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-create-assignment-modal',
  styleUrl: './create-assignment-modal.component.css',
  templateUrl: './create-assignment-modal.component.html',
})
export class CreateAssignmentModalComponent {
  private activeModal = inject(NgbActiveModal);
  private assignmentSrv = inject(AssignmentService);

  classroomId = '';

  isSaving = signal(false);
  errorMessage = signal<string | null>(null);

  title = signal('');

  canSubmit = computed(
    () => this.title().trim().length > 0 && !this.isSaving(),
  );

  confirmCreate() {
    if (!this.canSubmit()) return;
    this.isSaving.set(true);
    this.errorMessage.set(null);

    this.assignmentSrv.add(this.classroomId, this.title().trim()).subscribe({
      next: (created) => this.activeModal.close(created),
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set(
          "Non è stato possibile creare l'attività. Riprova.",
        );
      },
    });
  }

  close() {
    this.activeModal.dismiss();
  }
}
