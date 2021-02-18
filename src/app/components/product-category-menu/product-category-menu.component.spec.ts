import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategotyMenuComponent } from './product-categoty-menu.component';

describe('ProductCategotyMenuComponent', () => {
  let component: ProductCategotyMenuComponent;
  let fixture: ComponentFixture<ProductCategotyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategotyMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategotyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
