import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSignUpPage } from './user-sign-up.page';

describe('UserSignUpPage', () => {
  let component: UserSignUpPage;
  let fixture: ComponentFixture<UserSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
