import {
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { User } from '../../utils/types/user.type';

@Component({
  selector: 'app-create-classroom-modal',
  imports: [],
  templateUrl: './create-classroom-modal.component.html',
  styleUrl: './create-classroom-modal.component.css',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class CreateClassroomModalComponent {
  students = input.required<User[]>();
  classroomCreated = output<{ name: string; studentIds: string[] }>();

  private dropdownRef = viewChild.required<ElementRef<HTMLElement>>('dropdown');
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  isOpen = signal(false);
  isConfirming = signal(false);
  isDropdownOpen = signal(false);

  name = '';
  searchTerm = '';
  selectedStudentIds: string[] = [];

  filteredStudents = computed(() => {
    const term = this.debouncedSearchTerm().trim().toLowerCase();
    const all = this.students();
    if (!term) return all;
    return all.filter((s) => s.fullName.toLowerCase().includes(term));
  });

  debouncedSearchTerm = signal('');

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.debouncedSearchTerm.set(value);
    }, 200);
  }
  selectedStudents = computed(() => {
    const ids = this.selectedStudentIds;
    return this.students().filter((s) => ids.includes(s.id));
  });

  open() {
    this.isOpen.set(true);
    this.isConfirming.set(false);
  }

  close() {
    this.isOpen.set(false);
    this.isConfirming.set(false);
    this.isDropdownOpen.set(false);
  }

  toggleDropdown() {
    this.isDropdownOpen.update((v) => !v);
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.isDropdownOpen()) return;
    const target = event.target as HTMLElement;
    if (!this.dropdownRef().nativeElement.contains(target)) {
      this.isDropdownOpen.set(false);
    }
  }

  toggleStudent(id: string) {
    if (this.selectedStudentIds.includes(id)) {
      this.selectedStudentIds = this.selectedStudentIds.filter((s) => s !== id);
    } else {
      this.selectedStudentIds = [...this.selectedStudentIds, id];
    }
  }

  isSelected(id: string) {
    return this.selectedStudentIds.includes(id);
  }

  clearSelection() {
    this.selectedStudentIds = [];
  }

  goToConfirm() {
    if (!this.name.trim()) return;
    this.isDropdownOpen.set(false);
    this.isConfirming.set(true);
  }

  backToForm() {
    this.isConfirming.set(false);
  }

  confirmCreate() {
    this.classroomCreated.emit({
      name: this.name.trim(),
      studentIds: this.selectedStudentIds,
    });
    this.close();
  }
}
