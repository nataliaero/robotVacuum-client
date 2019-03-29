import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotVacuumComponent } from './robot-vacuum.component';

describe('RobotVacuumComponent', () => {
  let component: RobotVacuumComponent;
  let fixture: ComponentFixture<RobotVacuumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotVacuumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotVacuumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
