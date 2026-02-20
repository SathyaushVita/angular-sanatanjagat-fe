import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbyTrainingComponent } from './getby-training.component';

describe('GetbyTrainingComponent', () => {
  let component: GetbyTrainingComponent;
  let fixture: ComponentFixture<GetbyTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetbyTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetbyTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
