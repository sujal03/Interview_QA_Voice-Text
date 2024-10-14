
from flask import Flask, jsonify, request, session, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
from flask_session import Session
import os
import io


load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'your_secret_key'
Session(app)


def generate_theoretical_question():
    client = Groq()
    response = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Generate a very basic Python-related theoretical question for beginners. with out mcq option and don't show prompt"
        }],
        model="llama3-8b-8192",
        temperature=0.1,
        max_tokens=1024,
        top_p=1
    )
    question = response.choices[0].message.content
    return question

def generate_logical_question():
    client = Groq()
    response = client.chat.completions.create(
        messages=[{
            "role": "system",
            "content": "Generate a basic logical Python-related question for beginners. with out mcq option and don't show prompt"
        }],
        model="llama3-8b-8192",
        temperature=0.1,
        max_tokens=1024,
        top_p=1
    )
    question = response.choices[0].message.content
    return question

def initialize_quiz():
    session['questions'] = []
    session['answers'] = []
    session['current_question_index'] = 0
    session['total_questions'] = 3


@app.route('/api/start', methods=['POST'])
def start_quiz():
    initialize_quiz()
    return jsonify({"message": "Quiz started"}), 200


@app.route('/api/question', methods=['GET', 'POST'])
def next_question():
    if 'current_question_index' not in session:
        initialize_quiz()

    try:
        if session['current_question_index'] < session['total_questions']:
            if request.method == 'POST':
                data = request.get_json()
                answer = data.get('answer')
                if not answer:
                    return jsonify({'error': 'Answer is required'}), 400
                
                session['answers'].append(answer)
                session['current_question_index'] += 1

            if session['current_question_index'] < session['total_questions']:
                if session['current_question_index'] == 2:
                    question = "Write a Python program to check a factorial number."
                else:
                    question = generate_theoretical_question()
                session['questions'].append(question)
                return jsonify({
                    "question": question,
                    "q_num": session['current_question_index'] + 1
                }), 200
            else:
                return jsonify({"redirect": "/api/result"}), 200
        else:
            return jsonify({"redirect": "/api/result"}), 200

    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/api/question_logic', methods=['GET', 'POST'])
def next_question_logic():
    if 'current_question_index' not in session:
        initialize_quiz()

    try:
        if session['current_question_index'] < session['total_questions']:
            if request.method == 'POST':
                data = request.get_json()
                answer = data.get('answer')
                if not answer:
                    return jsonify({'error': 'Answer is required'}), 400
                
                session['answers'].append(answer)
                session['current_question_index'] += 1

            if session['current_question_index'] < session['total_questions']:
                if session['current_question_index'] == 2:
                    question = "Write a Python program to check a factorial number."
                else:
                    question = generate_logical_question()
                session['questions'].append(question)
                return jsonify({
                    "question": question,
                    "q_num": session['current_question_index'] + 1
                }), 200
            else:
                return jsonify({"redirect": "/api/result"}), 200
        else:
            return jsonify({"redirect": "/api/result"}), 200

    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/api/result', methods=['POST'])
def result():
    try:
        data = request.get_json()
        if not isinstance(data, list):
            return jsonify({'error': 'Invalid data format'}), 400
        
        for item in data:
            if not all(k in item for k in ("question", "answer")):
                return jsonify({'error': 'Each item must contain both question and answer'}), 400

        text_content = ""
        for i, qa in enumerate(data):
            text_content += f"Q{i+1}: {qa['question']}\nA{i+1}: {qa['answer']}\n\n"
        
        text_buffer = io.StringIO(text_content)
        return send_file(
            io.BytesIO(text_buffer.getvalue().encode('utf-8')),
            as_attachment=True,
            download_name='quiz_result.txt',
            mimetype='text/plain'
        )
    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
