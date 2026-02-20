import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbyEventsComponent } from './getby-events.component';

describe('GetbyEventsComponent', () => {
  let component: GetbyEventsComponent;
  let fixture: ComponentFixture<GetbyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetbyEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetbyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
