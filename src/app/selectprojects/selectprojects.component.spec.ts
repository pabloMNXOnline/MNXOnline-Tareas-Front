import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectprojectsComponent } from './selectprojects.component';

describe('SelectprojectsComponent', () => {
  let component: SelectprojectsComponent;
  let fixture: ComponentFixture<SelectprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectprojectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
