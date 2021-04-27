import {Subject} from "rxjs";
import {SavedElement} from "./saved-element";

export class Paper implements SavedElement<PaperJSON>{
    private paperUpdated$ = new Subject<void>()
    updated$ = this.paperUpdated$.asObservable()

    private columns: number
    constructor() {
        this.columns = 1
    }

    setColumns(column: number) {
        this.columns = column
        this.paperUpdated$.next()
    }
    getColumns(): number {
        return this.columns
    }

    toJSON(): PaperJSON {
        return {
            columns: this.columns
        }
    }

    static fromJSON(json: PaperJSON): Paper {
        const paper = new Paper()
        paper.setColumns(json.columns)
        return paper
    }
}

export interface PaperJSON {
    columns: number
}
