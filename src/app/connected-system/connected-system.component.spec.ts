import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectedSystemComponent} from './connected-system.component';

describe('ConnectedSystemComponent', () => {
  let component: ConnectedSystemComponent;
  let fixture: ComponentFixture<ConnectedSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectedSystemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
