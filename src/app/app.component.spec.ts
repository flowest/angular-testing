import { AppComponent } from './app.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ValueService } from './services/value.service';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { By } from '@angular/platform-browser';
import { DxButtonModule, DxListModule } from 'devextreme-angular';

describe('AppComoponent', () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let valueService: ValueService;

    const fakeItems: Array<{ id: number, text: string }> = [
        { id: 1, text: 'fake 1' },
        { id: 2, text: 'fake 2' },
        { id: 3, text: 'fake 3' }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DxButtonModule, // <-- IMPORTING THIS MODULE MAKES NO PROBLEMS
                DxListModule    // <-- THIS IMPORT PRODUCES THE ERROR "Timeout - Async callback was not invoked within 5000ms"
                                //     FOR ASYNC TEST FUNCTIONS (SEE THE LAST ONE)
            ],
            declarations: [AppComponent],
            providers: [ValueService]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        valueService = TestBed.get(ValueService);
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should load items', async(() => {
        const valueSpy = spyOn(valueService, 'getValues').and.returnValue(timer(1000).pipe(mapTo(fakeItems)));

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(component.items.length).toEqual(3);
            expect(component.items).toEqual(fakeItems);
            expect(valueSpy).toHaveBeenCalled();
            expect(valueSpy).toHaveBeenCalledTimes(1);
        });
    }));

    it('should show a button with text when items are loaded', async(() => {
        const valueSpy = spyOn(valueService, 'getValues').and.returnValue(timer(1000).pipe(mapTo(fakeItems)));
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const componentWrapperElement = fixture.debugElement.query(By.css('div.app-content'));
            expect((componentWrapperElement.nativeElement as HTMLElement).innerHTML).toContain('dx-button');

            const buttonElement = fixture.debugElement.query(By.css('dx-button'));
            expect((buttonElement.nativeElement as HTMLElement).innerHTML).toContain('Button when items are loaded');
        });
    }));


    it('should render a list with same amount of entries as the service returns items', async(() => {
        const valueSpy = spyOn(valueService, 'getValues').and.returnValue(timer(1000).pipe(mapTo(fakeItems)));
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const componentWrapperElement = fixture.debugElement.query(By.css('div.app-content'));
            expect((componentWrapperElement.nativeElement as HTMLElement).innerHTML).toContain('dx-list');

            const dxListElement = fixture.debugElement.query(By.css('dx-list'));
            expect((dxListElement.nativeElement as HTMLElement).querySelectorAll('div.dx-item dx-list-item').length).toEqual(3);
        });
    }));


});
