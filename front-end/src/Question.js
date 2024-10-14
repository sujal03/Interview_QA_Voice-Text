// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Question() {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [qans, setQans] = useState([]);
//     const [count, setCount] = useState(1);
//     const [isRecording, setIsRecording] = useState(false);
//     const [isContinousRecording, setIsContinousRecording] = useState(true); // Manage continuous recording
//     const [timer, setTimer] = useState(30); // Timer state for 30 seconds
//     const recognitionRef = useRef(null);
//     const isRecognitionRunning = useRef(false); // Ref to track recognition state
//     const timerRef = useRef(null); // Ref to track the timer

//     const navigate = useNavigate();

//     // Initialize speech recognition
//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             recognitionRef.current = new SpeechRecognition();
//             const recognition = recognitionRef.current;
//             recognition.continuous = false;  // We'll manually restart the recognition
//             recognition.lang = 'en-US';
//             recognition.interimResults = false;
//             recognition.maxAlternatives = 1;

//             recognition.onresult = (event) => {
//                 const speechResult = event.results[0][0].transcript;
//                 setAnswer(speechResult);  // Automatically set the transcribed text as the answer
//                 setIsRecording(false);    // Stop recording once answer is received
//                 isRecognitionRunning.current = false; // Mark recognition as stopped
//             };

//             recognition.onerror = (event) => {
//                 console.error('Speech recognition error detected: ' + event.error);
//                 setIsRecording(false);
//                 isRecognitionRunning.current = false; // Mark recognition as stopped on error
//             };

//             recognition.onend = () => {
//                 isRecognitionRunning.current = false; // Mark recognition as stopped when it ends
//                 // Restart the recognition if continuous mode is enabled
//                 if (isContinousRecording) {
//                     startRecording(); // Restart recording automatically
//                 }
//             };
//         } else {
//             console.error('SpeechRecognition is not supported in this browser.');
//         }
//     }, [isContinousRecording]);  // Dependency on continuous recording mode

//     const getQuestions = async () => {
//         try {
//             const que = await axios.get('http://127.0.0.1:5000/api/question');
//             setQuestion(que?.data);
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     useEffect(() => {
//         if (count < 3) {
//             getQuestions();
//         }
//     }, [currentQuestionIndex, count]);

//     // Automatically start recording when a new question appears
//     useEffect(() => {
//         if (question?.question && recognitionRef.current) {
//             startRecording();  // Start recording as soon as a new question is set
//         }
//     }, [question]);

//     // Start the 30-second timer when a new question is loaded
//     useEffect(() => {
//         if (question?.question) {
//             setTimer(30); // Reset timer to 30 seconds for each new question

//             if (timerRef.current) {
//                 clearInterval(timerRef.current); // Clear any previous timer
//             }

//             timerRef.current = setInterval(() => {
//                 setTimer((prevTime) => {
//                     if (prevTime === 1) {
//                         handleSubmit(); // Auto-submit when time runs out
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);

//             // Cleanup interval when component unmounts or timer completes
//             return () => clearInterval(timerRef.current);
//         }
//     }, [question]);

//     const handleAnswerChange = (e) => {
//         setAnswer(e.target.value);
//     };

//     const handleSubmit = async () => {
//         let number = count + 1;
//         setCount(number);
//         setQans([...qans, { question: question?.question, answer }]);

//         // Reset the answer input and move to the next question
//         setAnswer('');
//         clearInterval(timerRef.current); // Stop the timer when the answer is submitted
//         getQuestions(); // Load the next question
//     };

//     const downloadResult = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/api/result', qans, {
//                 responseType: 'blob'
//             });
//             const blob = new Blob([response.data], { type: 'text/plain' });
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.download = 'quiz_result.txt';
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             setCount(1);
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     const startRecording = () => {
//         const recognition = recognitionRef.current;
//         if (recognition && !isRecognitionRunning.current) {  // Only start if it's not already running
//             setIsRecording(true);
//             recognition.start();
//             isRecognitionRunning.current = true;  // Mark recognition as running
//         } else {
//             console.error('SpeechRecognition is already running.');
//         }
//     };

//     return (
//         <div className="container">
//             {count === 4 && qans.length === 3 ? (
//                 <button type='button' onClick={downloadResult}>Test Done</button>
//             ) : (
//                 <>
//                     <h2>Question {count}</h2>
//                     <p>{question?.question}</p>

//                     <label htmlFor="answer">Your Answer:</label><br />
//                     <input
//                         type="text"
//                         id="answer"
//                         name="answer"
//                         value={answer}
//                         onChange={handleAnswerChange}
//                         required
//                     /><br /><br />

//                     <p>Time remaining: {timer} seconds</p> {/* Display timer */}

//                     <button type='button' onClick={handleSubmit}>Submit</button>
//                     <button type='button' onClick={startRecording} disabled={isRecording}>
//                         {isRecording ? 'Recording...' : 'Answer with Voice'}
//                     </button>
//                 </>
//             )}
//             <br />
//             <label>
//                 <input
//                     type="checkbox"
//                     checked={isContinousRecording}
//                     onChange={(e) => setIsContinousRecording(e.target.checked)}
//                 />
//                 Continuous Voice Input
//             </label>
//         </div>
//     );
// }

// export default Question;


























// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Question() {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [qans, setQans] = useState([]);
//     const [count, setCount] = useState(1);
//     const [isRecording, setIsRecording] = useState(false);
//     const [isContinousRecording, setIsContinousRecording] = useState(true);
//     const [timer, setTimer] = useState(30);
//     const recognitionRef = useRef(null);
//     const isRecognitionRunning = useRef(false);
//     const timerRef = useRef(null);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             recognitionRef.current = new SpeechRecognition();
//             recognitionRef.current.continuous = false;
//             recognitionRef.current.lang = 'en-US';
//             recognitionRef.current.interimResults = false;
//             recognitionRef.current.maxAlternatives = 1;

//             recognitionRef.current.onresult = (event) => {
//                 setAnswer(event.results[0][0].transcript);
//                 setIsRecording(false);
//                 isRecognitionRunning.current = false;
//             };

//             recognitionRef.current.onerror = () => {
//                 setIsRecording(false);
//                 isRecognitionRunning.current = false;
//             };

//             recognitionRef.current.onend = () => {
//                 isRecognitionRunning.current = false;
//                 if (isContinousRecording) startRecording();
//             };
//         } else {
//             console.error('SpeechRecognition is not supported in this browser.');
//         }
//     }, [isContinousRecording]);

//     const getQuestions = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5000/api/question');
//             setQuestion(response?.data?.question);
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     useEffect(() => {
//         if (count < 3) {
//             getQuestions();
//         } else if (count === 3) {
//             // Set the fixed third question
//             setQuestion('Write a Python program to check a factorial number.');
//         }
//     }, [count]);

//     useEffect(() => {
//         if (question && recognitionRef.current) {
//             startRecording();
//         }
//     }, [question]);

//     useEffect(() => {
//         if (question) {
//             setTimer(30);
//             clearInterval(timerRef.current);

//             timerRef.current = setInterval(() => {
//                 setTimer((prevTime) => {
//                     if (prevTime === 1) {
//                         handleSubmit();
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);

//             return () => clearInterval(timerRef.current);
//         }
//     }, [question]);

//     const handleAnswerChange = (e) => {
//         setAnswer(e.target.value);
//     };

//     const handleSubmit = async () => {
//         let number = count + 1;
//         setCount(number);
//         setQans([...qans, { question: question?.question, answer }]);

//         // Reset the answer input and move to the next question
//         setAnswer('');
//         clearInterval(timerRef.current); // Stop the timer when the answer is submitted
//         getQuestions(); // Load the next question
//     };

//     const downloadResult = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/api/result', qans, {
//                 responseType: 'blob'
//             });
//             const blob = new Blob([response.data], { type: 'text/plain' });
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.download = 'quiz_result.txt';
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             setCount(1);
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     const startRecording = () => {
//         const recognition = recognitionRef.current;
//         if (recognition && !isRecognitionRunning.current) {  // Only start if it's not already running
//             setIsRecording(true);
//             recognition.start();
//             isRecognitionRunning.current = true;  // Mark recognition as running
//         } else {
//             console.error('SpeechRecognition is already running.');
//         }
//     };

//     return (
//         <div className="container">
//             {count === 4 && qans.length === 3 ? (
//                 <button type='button' onClick={downloadResult}>Test Done</button>
//             ) : (
//                 <>
//                     <h2>Question {count}</h2>
//                     <p>{question?.question}</p>

//                     <label htmlFor="answer">Your Answer:</label><br />
//                     <input
//                         type="text"
//                         id="answer"
//                         name="answer"
//                         value={answer}
//                         onChange={handleAnswerChange}
//                         required
//                     /><br /><br />

//                     <p>Time remaining: {timer} seconds</p> {/* Display timer */}

//                     <button type='button' onClick={handleSubmit}>Submit</button>
//                     <button type='button' onClick={startRecording} disabled={isRecording}>
//                         {isRecording ? 'Recording...' : 'Answer with Voice'}
//                     </button>
//                 </>
//             )}
//             <br />
//             <label>
//                 <input
//                     type="checkbox"
//                     checked={isContinousRecording}
//                     onChange={(e) => setIsContinousRecording(e.target.checked)}
//                 />
//                 Continuous Voice Input
//             </label>
//         </div>
//     );
// }

// export default Question;














// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Question() {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [qans, setQans] = useState([]);
//     const [count, setCount] = useState(1);
//     const [isRecording, setIsRecording] = useState(false);
//     const [isContinousRecording, setIsContinousRecording] = useState(true);
//     const [timer, setTimer] = useState(30);
//     const recognitionRef = useRef(null);
//     const isRecognitionRunning = useRef(false);
//     const timerRef = useRef(null);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         if (SpeechRecognition) {
//             recognitionRef.current = new SpeechRecognition();
//             recognitionRef.current.continuous = false;
//             recognitionRef.current.lang = 'en-US';
//             recognitionRef.current.interimResults = false;
//             recognitionRef.current.maxAlternatives = 1;

//             recognitionRef.current.onresult = (event) => {
//                 setAnswer(event.results[0][0].transcript);
//                 setIsRecording(false);
//                 isRecognitionRunning.current = false;
//             };

//             recognitionRef.current.onerror = () => {
//                 setIsRecording(false);
//                 isRecognitionRunning.current = false;
//             };

//             recognitionRef.current.onend = () => {
//                 isRecognitionRunning.current = false;
//                 if (isContinousRecording) startRecording();
//             };
//         } else {
//             console.error('SpeechRecognition is not supported in this browser.');
//         }
//     }, [isContinousRecording]);

//     const getQuestions = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5000/api/question');
//             setQuestion(response?.data?.question);
//         } catch (error) {
//             console.log("error", error);
//         }

//     const getQuestions_logical = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5000/api/question_logic');
//             setQuestion(response?.data?.question);
//         } catch (error) {
//             console.log("error", error);
//         }    
//     };

//     useEffect(() => {
//         if (count < 3) {
//             getQuestions();
//         } else if (count === 3) {
//             getQuestions_logical();
//             setQuestion('Write a Python program to check a factorial number.');
//         }
//     }, [count]);

//     useEffect(() => {
//         if (question && recognitionRef.current) {
//             startRecording();
//         }
//     }, [question]);

//     useEffect(() => {
//         if (question) {
//             setTimer(30);
//             clearInterval(timerRef.current);

//             timerRef.current = setInterval(() => {
//                 setTimer((prevTime) => {
//                     if (prevTime === 1) {
//                         handleSubmit();
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);

//             return () => clearInterval(timerRef.current);
//         }
//     }, [question]);

//     const handleAnswerChange = (e) => {
//         setAnswer(e.target.value);
//     };

//     const handleSubmit = async () => {
//         setQans([...qans, { question, answer }]);
//         setAnswer('');
//         clearInterval(timerRef.current);
//         setCount(count + 1);
//     };

//     const downloadResult = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/api/result', qans, {
//                 responseType: 'blob'
//             });
//             const blob = new Blob([response.data], { type: 'text/plain' });
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.download = 'quiz_result.txt';
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             setCount(1);
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     const startRecording = () => {
//         const recognition = recognitionRef.current;
//         if (recognition && !isRecognitionRunning.current) {
//             setIsRecording(true);
//             recognition.start();
//             isRecognitionRunning.current = true;
//         } else {
//             console.error('SpeechRecognition is already running.');
//         }
//     };

//     return (
//         <div className="container">
//             {count === 4 && qans.length === 3 ? (
//                 <button type='button' onClick={downloadResult}>Download Test Result</button>
//             ) : (
//                 <>
//                     <h2>Question {count}</h2>
//                     <p>{question}</p>

//                     <label htmlFor="answer">Your Answer:</label><br />
//                     <input
//                         type="text"
//                         id="answer"
//                         name="answer"
//                         value={answer}
//                         onChange={handleAnswerChange}
//                         required
//                     /><br /><br />

//                     <p>Time remaining: {timer} seconds</p>

//                     <button type='button' onClick={handleSubmit}>Submit</button>
//                     <button type='button' onClick={startRecording} disabled={isRecording}>
//                         {isRecording ? 'Recording...' : 'Answer with Voice'}
//                     </button>
//                 </>
//             )}
//             <br />
//             <label>
//                 <input
//                     type="checkbox"
//                     checked={isContinousRecording}
//                     onChange={(e) => setIsContinousRecording(e.target.checked)}
//                 />
//                 Continuous Voice Input
//             </label>
//         </div>
//     );
// }

// export default Question;





















import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Question() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [qans, setQans] = useState([]);
    const [count, setCount] = useState(1);
    const [isRecording, setIsRecording] = useState(false);
    const [isContinousRecording, setIsContinousRecording] = useState(true);
    const [timer, setTimer] = useState(30);
    const recognitionRef = useRef(null);
    const isRecognitionRunning = useRef(false);
    const timerRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onresult = (event) => {
                setAnswer(event.results[0][0].transcript);
                setIsRecording(false);
                isRecognitionRunning.current = false;
            };

            recognitionRef.current.onerror = () => {
                setIsRecording(false);
                isRecognitionRunning.current = false;
            };

            recognitionRef.current.onend = () => {
                isRecognitionRunning.current = false;
                if (isContinousRecording) startRecording();
            };
        } else {
            console.error('SpeechRecognition is not supported in this browser.');
        }
    }, [isContinousRecording]);

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/question');
            setQuestion(response?.data?.question);
        } catch (error) {
            console.log("error", error);
        }
    }; 

    const getQuestions_logical = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/question_logic');
            setQuestion(response?.data?.question);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (count < 3) {
            getQuestions();
        } else if (count === 3) {
            getQuestions_logical();
            // setQuestion('Write a Python program to check a factorial number.');
        }
    }, [count]);

    useEffect(() => {
        if (question && recognitionRef.current) {
            startRecording();
        }
    }, [question]);

    useEffect(() => {
        if (question) {
            setTimer(30);
            clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                setTimer((prevTime) => {
                    if (prevTime === 1) {
                        handleSubmit();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [question]);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = async () => {
        setQans([...qans, { question, answer }]);
        setAnswer('');
        clearInterval(timerRef.current);
        setCount(count + 1);
    };

    const downloadResult = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/result', qans, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'text/plain' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'quiz_result.txt';
            document.body.appendChild(link);
            link.click();
            link.remove();
            setCount(1);
        } catch (error) {
            console.log("error", error);
        }
    };

    const startRecording = () => {
        const recognition = recognitionRef.current;
        if (recognition && !isRecognitionRunning.current) {
            setIsRecording(true);
            recognition.start();
            isRecognitionRunning.current = true;
        } else {
            console.error('SpeechRecognition is already running.');
        }
    };

    return (
        <div className="container">
            {count === 4 && qans.length === 3 ? (
                <button type='button' onClick={downloadResult}>Download Test Result</button>
            ) : (
                <>
                    <h2>Question {count}</h2>
                    <p>{question}</p>

                    <label htmlFor="answer">Your Answer:</label><br />
                    <input
                        type="text"
                        id="answer"
                        name="answer"
                        value={answer}
                        onChange={handleAnswerChange}
                        required
                    /><br /><br />

                    <p>Time remaining: {timer} seconds</p>

                    <button type='button' onClick={handleSubmit}>Submit</button>
                    <button type='button' onClick={startRecording} disabled={isRecording}>
                        {isRecording ? 'Recording...' : 'Answer with Voice'}
                    </button>
                </>
            )}
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={isContinousRecording}
                    onChange={(e) => setIsContinousRecording(e.target.checked)}
                />
                Continuous Voice Input
            </label>
        </div>
    );
}

export default Question; 
