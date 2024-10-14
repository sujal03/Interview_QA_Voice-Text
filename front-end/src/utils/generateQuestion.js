import React from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const generateQuestion = async () => {
    const apiKey = process.env.GROQ_API_KEY;
    // ... (rest of the logic to generate question)
};

export default generateQuestion;