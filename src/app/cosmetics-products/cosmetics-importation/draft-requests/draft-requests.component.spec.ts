import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftRequestsComponent } from './draft-requests.component';

describe('DraftRequestsComponent', () => {
  let component: DraftRequestsComponent;
  let fixture: ComponentFixture<DraftRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
