import React = require("react");
import {Question} from "./question";
import {MultipleChoice} from "./multiple-choice";

export function QuestionComponent(
    {
        question
    }: {
        question: Question
    }
) {
    return <>
        {question instanceof MultipleChoice && <QuestionComponent question={question} />}
    </>
}