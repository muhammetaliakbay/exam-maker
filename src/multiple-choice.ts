import {Question, QuestionType} from "./question";
import {Choice, ChoiceJSON} from "./choice";
import {concat, merge, of, Subject} from "rxjs";
import {switchMap} from "rxjs/operators";

export class MultipleChoice implements Question<MultipleChoiceJSON> {
    private choicesUpdated$ = new Subject<void>()
    updated$ = this.choicesUpdated$.pipe(
        switchMap(
            () => concat(
                of(void 0),
                merge(...this.choices.map(choice => choice.updated$))
            )
        )
    )

    private choices: Choice[]
    constructor() {
        this.choices = []
    }

    getChoices(): Choice[] {
        return this.choices
    }
    addChoice(choice: Choice) {
        this.choices = [...this.choices, choice]
        this.choicesUpdated$.next()
    }
    removeChoice(choice: Choice) {
        this.choices = this.choices.filter(c => c !== choice)
        this.choicesUpdated$.next()
    }

    toJSON(): MultipleChoiceJSON {
        return {
            type: QuestionType.MULTIPLE_CHOICES,
            choices: this.choices.map(
                choice => choice.toJSON()
            )
        }
    }

    static fromJSON(json: MultipleChoiceJSON): MultipleChoice {
        const question = new MultipleChoice()
        for (const choiceJSON of json.choices) {
            question.addChoice(
                Choice.fromJSON(choiceJSON)
            )
        }
        return question
    }
}

export interface MultipleChoiceJSON {
    type: QuestionType.MULTIPLE_CHOICES,
    choices: ChoiceJSON[]
}