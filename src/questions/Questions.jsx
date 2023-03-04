import axios from "axios";
import { MathJax } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";

function Questions() {
  const topics = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ];
  const URL =
    "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=";
  const [step, setStep] = useState(0);
  const [querry, setQuerry] = useState("");
  const [question, setQuestion] = useState("");
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const showStep = (i) => {
    switch (i) {
      case i:
        return setQuerry(topics[i]);
    }
  };
  useEffect(() => {
    showStep(step);
    console.log("hello");
  }, [step]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(true);
      const response = await axios.get(querry && ` ${URL.concat(querry)}`);
      if (response?.data[0]) {
        setQuestion(response?.data[0]?.Question);
        setChapter(response?.data[0]?.ChapterID);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Something Went worng");
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [querry]);

  return (
    <>
      {loading ? (
        <div className="loadingWrap">
          <Loader />
        </div>
      ) : (
        <>
          {error ? (
            <div className="loadingWrap">
              <p>{errorMsg}</p>
            </div>
          ) : (
            <div className="mainQuestions">
              <div className="question">
                {chapter && (
                  <h2 className="chapter">
                    Chapter: <span>{chapter}</span>
                  </h2>
                )}
                {question && (
                  <MathJax>
                    {" "}
                    <p className="questionItem">{question}</p>
                  </MathJax>
                )}
              </div>
              <div className="btn-box">
                <div className={step === 0 ? "disable" : ""}>
                  <button
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0 ? "true" : ""}
                  >
                    Back
                  </button>
                </div>
                <div className={step === topics?.length - 1 ? "disable" : ""}>
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={step === topics?.length - 1 ? "true" : ""}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Questions;
