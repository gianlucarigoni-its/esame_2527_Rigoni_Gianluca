import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailClassroomComponent } from './detail-classroom.component';

describe('DetailClassroomComponent', () => {
  let component: DetailClassroomComponent;
  let fixture: ComponentFixture<DetailClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailClassroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailClassroomComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
