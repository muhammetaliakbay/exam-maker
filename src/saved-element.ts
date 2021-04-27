import {Observable} from "rxjs";

export interface SavedElement<J> {
    toJSON(): J
    readonly updated$: Observable<void>
}