import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAssignmentModalComponent } from './create-assignment-modal.component';

describe('CreateAssignmentModalComponent', () => {
  let component: CreateAssignmentModalComponent;
  let fixture: ComponentFixture<CreateAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssignmentModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAssignmentModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
