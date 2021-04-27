import {Question, QuestionJSON} from "./question";
import {SavedElement} from "./saved-element";
import {concat, merge, of, Subject} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Paper, PaperJSON} from "./paper";

export class Exam implements SavedElement<ExamJSON>{
    private questionsUpdated$ = new Subject<void>()
    private paperUpdated$ = new Subject<void>()
    updated$ = concat(
        this.questionsUpdated$.pipe(
            switchMap(
                () => concat(
                    of(void 0),
                    merge(...this.questions.map(choice => choice.updated$))
                )
            )
        ),
        this.paperUpdated$.pipe(
            switchMap(
                () => concat(
                    of(void 0),
                    this.paper.updated$
                )
            )
        )
    )

    private questions: Question[]
    private paper: Paper
    constructor() {
        this.questions = []
        this.paper = new Paper()
    }

    getQuestions(): Question[] {
        return this.questions
    }

    addQuestion(question: Question) {
        this.questions = [...this.questions, question]
        this.questionsUpdated$.next()
    }
    removeQuestion(question: Question) {
        this.questions = this.questions.filter(q => q !== question)
        this.questionsUpdated$.next()
    }

    setPaper(paper: Paper) {
        this.paper = paper
        this.paperUpdated$.next()
    }
    getPaper(): Paper {
        return this.paper
    }

    toJSON(): ExamJSON {
        return {
            questions: this.questions.map(
                question => question.toJSON()
            ),
            paper: this.paper.toJSON()
        }
    }

    static fromJSON(json: ExamJSON): Exam {
        const exam = new Exam()
        for (const questionJSON of json.questions) {
            exam.addQuestion(
                Question.fromJSON(questionJSON)
            )
        }
        exam.setPaper(
            Paper.fromJSON(json.paper)
        )
        return exam
    }
}

export interface ExamJSON {
    questions: QuestionJSON[],
    paper: PaperJSON
}