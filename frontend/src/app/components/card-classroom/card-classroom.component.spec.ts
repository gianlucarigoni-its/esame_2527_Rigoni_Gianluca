import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardClassroomComponent } from './card-classroom.component';

describe('CardClassroomComponent', () => {
  let component: CardClassroomComponent;
  let fixture: ComponentFixture<CardClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardClassroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardClassroomComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
