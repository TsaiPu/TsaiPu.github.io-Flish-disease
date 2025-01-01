
// Optimized JavaScript Quiz System

// Randomly select questions from the full list
const getRandomQuestions = (questions, count) => {
    return questions.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Display questions dynamically on the webpage
const displayQuestions = (questions) => {
    const quizForm = document.getElementById("quizForm");
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");
        q.options.forEach((option, i) => {
            const optionId = `q${index}_option${i}`;
            optionsDiv.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${option}" id="${optionId}"> ${option}
                </label>
            `;
        });

        questionDiv.appendChild(optionsDiv);
        quizForm.appendChild(questionDiv);
    });
};

// Grade the quiz and display results
const gradeQuiz = (questions) => {
    let correctCount = 0;
    let incorrectCount = 0;
    let incorrectQuestions = [];

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const correctOption = q.options.find(option => option.startsWith(q.correct));

        if (selectedOption) {
            if (selectedOption.value === correctOption) {
                correctCount++;
            } else {
                incorrectCount++;
                incorrectQuestions.push({
                    number: index + 1,
                    question: q.question,
                    correctAnswer: correctOption
                });
            }
        } else {
            incorrectCount++;
            incorrectQuestions.push({
                number: index + 1,
                question: q.question,
                correctAnswer: correctOption
            });
        }
    });

    // Display results
    const resultDiv = document.getElementById("result");
    let resultHTML = `
        <p>正確：<span class="correct">${correctCount}</span> 題</p>
        <p>錯誤：${incorrectCount} 題</p>
        <h3>錯誤題目：</h3>
        <ul>
    `;

    incorrectQuestions.forEach(item => {
        resultHTML += `<li>第 ${item.number} 題：${item.question}<br><strong>正確答案：</strong> ${item.correctAnswer}</li>`;
    });
    resultHTML += '</ul>';

    resultDiv.innerHTML = resultHTML;
};

// Initialize Quiz
document.addEventListener("DOMContentLoaded", () => {
    const randomQuestions = getRandomQuestions(questions, 80); // Select 80 questions
    displayQuestions(randomQuestions);

    const submitButton = document.getElementById("submitQuiz");
    submitButton.addEventListener("click", () => gradeQuiz(randomQuestions));
});
