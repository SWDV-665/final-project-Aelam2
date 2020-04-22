import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSignInPage } from './user-sign-in.page';

describe('UserSignInPage', () => {
  let component: UserSignInPage;
  let fixture: ComponentFixture<UserSignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
