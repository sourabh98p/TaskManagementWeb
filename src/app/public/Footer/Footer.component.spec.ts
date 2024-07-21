import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FooterComponent } from './Footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it("should render a footer component", () => {
    expect(component).toBeTruthy();
  });

  it("currentYear method should return current year", () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toEqual(currentYear);
  });

  it("should open the terms & condition from footer links", () => {
    const spy = spyOn(window, 'open');
    component.helpWindow();
    
    expect(spy).toHaveBeenCalledWith(
      'https://www.mykastle.com/main/TCPP/TCPP.aspx', 'TCPP', 'resizable=yes, width=1500, height=800,scrollbars=yes'
    );
  })

})