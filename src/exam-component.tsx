import React = require("react");
import {Exam} from "./exam";

export function ExamComponent(
    {
        exam
    }: {
        exam: Exam
    }
) {
    const questions = exam.getQuestions()
        return <></>
}