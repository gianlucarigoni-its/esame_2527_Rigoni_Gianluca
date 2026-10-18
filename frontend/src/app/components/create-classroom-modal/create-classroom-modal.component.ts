import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NgbActiveModal,
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownItem,
  NgbDropdownMenu,
} from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '../../services/classroom.service';
import { UserService } from '../../services/user.service';
import { User } from '../../utils/interfaces/user';

@Component({
  selector: 'app-create-classroom-modal',
  imports: [NgbDropdown, NgbDropdownAnchor, NgbDropdownMenu, NgbDropdownItem],
  templateUrl: './create-classroom-modal.component.html',
  styleUrl: './create-classroom-modal.component.css',
})
export class CreateClassroomModalComponent {
  private activeModal = inject(NgbActiveModal);
  private classroomSrv = inject(ClassroomService);
  private userSrv = inject(UserService);

  students = signal<User[]>([]);
  studentsLoading = signal(true);
  studentsError = signal(false);

  isConfirming = signal(false);
  isSaving = signal(false);
  errorMessage = signal<string | null>(null);

  name = signal('');
  searchTerm = signal('');
  selectedIds = signal<string[]>([]);

  canProceed = computed(
    () => this.name().trim().length > 0 && this.selectedIds().length > 0,
  );

  filteredStudents = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const all = this.students();
    if (!term) return all;
    return all.filter((s) => s.fullName.toLowerCase().includes(term));
  });

  selectedStudents = computed(() => {
    const ids = this.selectedIds();
    return this.students().filter((s) => ids.includes(s.id));
  });

  constructor() {
    this.userSrv
      .getStudents()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (students) => {
          this.students.set(students);
          this.studentsLoading.set(false);
        },
        error: () => {
          this.studentsError.set(true);
          this.studentsLoading.set(false);
        },
      });
  }

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggleStudent(id: string) {
    this.selectedIds.update((ids) =>
      ids.includes(id) ? ids.filter((s) => s !== id) : [...ids, id],
    );
  }

  clearSelection() {
    this.selectedIds.set([]);
  }

  onEscape(event: Event, dropdown: NgbDropdown) {
    if (dropdown.isOpen()) {
      event.stopPropagation();
      dropdown.close();
    }
  }

  goToConfirm() {
    if (!this.canProceed()) return;
    this.errorMessage.set(null);
    this.isConfirming.set(true);
  }

  backToForm() {
    this.errorMessage.set(null);
    this.isConfirming.set(false);
  }

  confirmCreate() {
    if (this.isSaving()) return;
    this.isSaving.set(true);
    this.errorMessage.set(null);

    this.classroomSrv.add(this.name().trim(), this.selectedIds()).subscribe({
      next: (created) => this.activeModal.close(created),
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set(
          'Non è stato possibile creare la classe. Riprova.',
        );
      },
    });
  }

  close() {
    this.activeModal.dismiss();
  }
}
