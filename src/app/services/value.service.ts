import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { mapTo } from 'rxjs/internal/operators/mapTo';

@Injectable({
    providedIn: 'root'
})
export class ValueService {
    constructor() { }

    public getValues(): Observable<Array<{ id: number, text: string }>> {
        return timer(2000).pipe(mapTo([
            {
                id: 1,
                text: 'Value 1'
            },
            {
                id: 2,
                text: 'Value 2'
            },
            {
                id: 3,
                text: 'Value 3'
            },
            {
                id: 4,
                text: 'Value 4'
            }
        ]));
    }
}
