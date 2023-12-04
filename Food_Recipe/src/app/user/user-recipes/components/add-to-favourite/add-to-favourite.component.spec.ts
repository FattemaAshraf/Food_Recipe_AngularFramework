import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavouriteComponent } from './add-to-favourite.component';

describe('AddToFavouriteComponent', () => {
  let component: AddToFavouriteComponent;
  let fixture: ComponentFixture<AddToFavouriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToFavouriteComponent]
    });
    fixture = TestBed.createComponent(AddToFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
