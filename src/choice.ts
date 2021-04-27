import {SavedElement} from "./saved-element";
import {Subject} from "rxjs";

export class Choice implements SavedElement<ChoiceJSON>{
    updated$ = new Subject<void>()

    toJSON(): ChoiceJSON {
        return {}
    }

    static fromJSON(json: ChoiceJSON): Choice {
        const choice = new Choice()
        return choice
    }
}

export interface ChoiceJSON {

}