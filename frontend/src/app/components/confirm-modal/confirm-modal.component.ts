import { Component, inject, input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [],
  selector: 'app-confirm-modal',
  styleUrl: './confirm-modal.component.css',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  private activeModal = inject(NgbActiveModal);

  title = 'Conferma';
  message = "Confermi l'operazione?";
  confirmLabel = 'Conferma';

  confirm() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
