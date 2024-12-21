import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebConfigInputsComponent } from './web-config-inputs.component';

describe('WebConfigInputsComponent', () => {
  let component: WebConfigInputsComponent;
  let fixture: ComponentFixture<WebConfigInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebConfigInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebConfigInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
