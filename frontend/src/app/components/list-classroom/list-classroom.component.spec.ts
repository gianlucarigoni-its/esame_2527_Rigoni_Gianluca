import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListClassroomComponent } from './list-classroom.component';

describe('ListClassroomComponent', () => {
  let component: ListClassroomComponent;
  let fixture: ComponentFixture<ListClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClassroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListClassroomComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
