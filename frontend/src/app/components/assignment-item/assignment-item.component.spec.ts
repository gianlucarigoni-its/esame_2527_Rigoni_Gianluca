import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignmentItemComponent } from './assignment-item.component';

describe('AssignmentItemComponent', () => {
  let component: AssignmentItemComponent;
  let fixture: ComponentFixture<AssignmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
