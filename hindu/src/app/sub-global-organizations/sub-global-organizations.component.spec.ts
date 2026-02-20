import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGlobalOrganizationsComponent } from './sub-global-organizations.component';

describe('SubGlobalOrganizationsComponent', () => {
  let component: SubGlobalOrganizationsComponent;
  let fixture: ComponentFixture<SubGlobalOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubGlobalOrganizationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGlobalOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
