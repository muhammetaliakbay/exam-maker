import {SavedElement} from "./saved-element";
import {MultipleChoice, MultipleChoiceJSON} from "./multiple-choice";

export interface Question<J extends QuestionJSON = any> extends SavedElement<J>{

}

export const Question = {
    fromJSON(json: QuestionJSON): Question {
        switch (json.type) {
            case QuestionType.MULTIPLE_CHOICES:
                return MultipleChoice.fromJSON(json)
            default:
                throw new Error(`Unrecognized question type: ${json.type}`)
        }
    }
}

export enum QuestionType{
    MULTIPLE_CHOICES = 'multiple-choices'
}

export type QuestionJSON = MultipleChoiceJSON