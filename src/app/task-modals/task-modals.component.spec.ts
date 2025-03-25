import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalsComponent } from './task-modals.component';

describe('TaskModalsComponent', () => {
  let component: TaskModalsComponent;
  let fixture: ComponentFixture<TaskModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
