import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMsiComponent } from './download-msi.component';

describe('DownloadMsiComponent', () => {
  let component: DownloadMsiComponent;
  let fixture: ComponentFixture<DownloadMsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadMsiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadMsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
