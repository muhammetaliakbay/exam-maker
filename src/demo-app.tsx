import React = require("react");
import {useEffect, useMemo, useState} from "react";
import {Exam} from "./exam";
import {ExamComponent} from "./exam-component";
import {Button} from "@material-ui/core";

export function DemoApp() {
    const [hasUpdate, setUpdated] = useState(false)

    const exam = useMemo(
        () => new Exam(), []
    )
    useEffect(
        () => {
            const updateSubscribe = exam.updated$.subscribe(
                () => setUpdated(true)
            )
            return () => updateSubscribe.unsubscribe()
        }, [exam.updated$]
    )

    return <>
        <Button disabled={!hasUpdate}>Save</Button>
        <ExamComponent exam={exam} />
    </>
}