import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaClassiComponent } from './lista-classi.component';

describe('ListaClassiComponent', () => {
  let component: ListaClassiComponent;
  let fixture: ComponentFixture<ListaClassiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaClassiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaClassiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
