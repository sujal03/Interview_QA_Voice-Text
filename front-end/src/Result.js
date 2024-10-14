import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [downloadLink, setDownloadLink] = useState('');

    useEffect(() => {
        axios.get('/api/result')
            .then(response => {
                setQuestions(response.data.questions);
                setAnswers(response.data.answers);
                setDownloadLink(response.data.downloadLink);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container">
            <h1>Quiz Results</h1>
            <p>Your score is: {/* Logic to calculate score */}</p>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <strong>Q{index + 1}: </strong>{question}
                        <br />
                        <strong>A{index + 1}: </strong>{answers[index]}
                    </li>
                ))}
            </ul>
            <a href={downloadLink} download="results.txt">
                <button>Download Results</button>
            </a>
        </div>
    );
}

export default Result;
