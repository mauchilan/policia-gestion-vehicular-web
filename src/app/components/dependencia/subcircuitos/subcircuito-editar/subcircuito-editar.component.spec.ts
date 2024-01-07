import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcircuitoEditarComponent } from './subcircuito-editar.component';

describe('SubcircuitoEditarComponent', () => {
  let component: SubcircuitoEditarComponent;
  let fixture: ComponentFixture<SubcircuitoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcircuitoEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcircuitoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
