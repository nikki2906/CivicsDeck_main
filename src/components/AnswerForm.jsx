import { useState } from "react";

export default function AnswerForm({
    // props
    correctAnswer,
    updateStreaks,
    resetStreak,
    correct,
    setCorrectness,
}) {
    // set the answer state to a string
    const [answer, setAnswer] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleAnswerInput = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        // prevent the page from auto-refreshing
        e.preventDefault();
        setSubmitted(true);
        if (answer === correctAnswer) {
            updateStreaks();
            setCorrectness(true);
        } else {
            resetStreak();
            setCorrectness(false);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Enter your answer"
                    className={`ans-input ${submitted && correct ? 'correct' : submitted && !correct ? 'incorrect' : ''}`}
                    onChange={handleAnswerInput}
                />
                <button type="submit" className="submit-btn" >
                    Submit
                </button>
            </form>
        </div>
    );
}
