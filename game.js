const categoryImages = {
    fertility: ['Cetrotide.jpg', 'Crinone.jpg', 'GONAL.jpg', 'OVT.jpg', 'PERG.png'],
    oncology: ['Bav.jpg', 'ERB.jpg', 'TEP.jpg'],
    ms: ['REB.jpg', 'MAVE.jpg']
};

const gameData = {
    categories: {
        fertility: {
            name: 'פריון',
            questions: [
                {
                    question: 'איזה הורמון חשוב בתהליך הביוץ?',
                    options: ['FSH', 'TSH', 'GH', 'ACTH'],
                    correct: 'FSH'
                },
                {
                    question: 'מהו הגיל הממוצע של תחילת המנופאוזה?',
                    options: ['45-55', '35-45', '55-65', '40-50'],
                    correct: '45-55'
                },
                {
                    question: 'איזה ויטמין חשוב במיוחד בתקופת ההיריון?',
                    options: ['חומצה פולית', 'ויטמין C', 'ויטמין D', 'ויטמין A'],
                    correct: 'חומצה פולית'
                }
            ]
        },
        oncology: {
            name: 'אונקולוגיה',
            questions: [
                {
                    question: 'איזה מבין הבאים אינו סוג של טיפול אונקולוגי?',
                    options: ['דיאליזה', 'כימותרפיה', 'רדיותרפיה', 'אימונותרפיה'],
                    correct: 'דיאליזה'
                },
                {
                    question: 'מהו תפקיד ה-PET-CT?',
                    options: ['איתור גידולים', 'מדידת לחץ דם', 'בדיקת רמות סוכר', 'צילום רנטגן'],
                    correct: 'איתור גידולים'
                },
                {
                    question: 'איזה תא דם נפגע בדרך כלל מכימותרפיה?',
                    options: ['תאים לבנים', 'טסיות', 'תאים אדומים', 'כל התשובות נכונות'],
                    correct: 'כל התשובות נכונות'
                }
            ]
        },
        ms: {
            name: 'טרשת נפוצה',
            questions: [
                {
                    question: 'איזו מערכת בגוף נפגעת בטרשת נפוצה?',
                    options: ['מערכת העצבים', 'מערכת העיכול', 'מערכת הנשימה', 'מערכת השתן'],
                    correct: 'מערכת העצבים'
                },
                {
                    question: 'מהו הגיל השכיח להתפרצות המחלה?',
                    options: ['20-40', '40-60', '60-80', '10-20'],
                    correct: '20-40'
                },
                {
                    question: 'איזה תסמין אינו אופייני לטרשת נפוצה?',
                    options: ['כאבי פרקים', 'עייפות', 'טשטוש ראייה', 'חולשת שרירים'],
                    correct: 'כאבי פרקים'
                }
            ]
        }
    }
};

const questionExplanations = {
    fertility: {
        0: "FSH (Follicle Stimulating Hormone) הוא הורמון חיוני המעודד את התפתחות הזקיקים בשחלות ומשחק תפקיד מרכזי בתהליך הביוץ.",
        1: "גיל המנופאוזה הממוצע הוא 45-55, כאשר המנופאוזה מוגדרת כהפסקת המחזור החודשי למשך 12 חודשים רצופים.",
        2: "חומצה פולית חיונית להתפתחות תקינה של העובר, במיוחד במניעת מומים במערכת העצבים."
    },
    oncology: {
        0: "דיאליזה היא טיפול לבעיות כליות ולא טיפול אונקולוגי. הטיפולים האונקולוגיים העיקריים הם כימותרפיה, רדיותרפיה ואימונותרפיה.",
        1: "PET-CT משלב הדמיה תפקודית ומבנית ומאפשר לזהות גידולים ומיקומם בגוף.",
        2: "כימותרפיה משפיעה על כל תאי הדם מכיוון שהיא פוגעת בתאים המתחלקים במהירות."
    },
    ms: {
        0: "טרשת נפוצה פוגעת במערכת העצבים המרכזית, כולל המוח וחוט השדרה.",
        1: "המחלה מתפרצת בדרך כלל בגילאי 20-40, כאשר מערכת החיסון תוקפת את מעטפת המיאלין.",
        2: "כאבי פרקים אינם תסמין אופייני לטרשת נפוצה, בעוד שעייפות, טשטוש ראייה וחולשת שרירים הם תסמינים נפוצים."
    }
};

let currentPlayer = '';
let currentScore = 0;
let currentQuestionIndex = 0;
let currentCategory = '';
let questionsOrder = [];

function startGame() {
    const playerName = document.getElementById('player-name').value;
    if (!playerName) {
        alert('אנא הכנס את שמך');
        return;
    }

    currentPlayer = playerName;
    currentScore = 0;
    currentQuestionIndex = 0;
    
    questionsOrder = [];
    for (let category in gameData.categories) {
        gameData.categories[category].questions.forEach((_, index) => {
            questionsOrder.push({ category, index });
        });
    }
    shuffleArray(questionsOrder);

    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('score').textContent = currentScore;
    
    document.getElementById('category-images').innerHTML = '';
    
    showNextQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateCategoryImages(category) {
    const imagesContainer = document.getElementById('category-images');
    imagesContainer.innerHTML = '';

    categoryImages[category].forEach(imageName => {
        const img = document.createElement('img');
        img.src = `img/${imageName}`;
        img.alt = imageName.replace('.jpg', '');
        img.title = imageName.replace('.jpg', '');
        imagesContainer.appendChild(img);
    });
}

function showNextQuestion() {
    if (currentQuestionIndex >= questionsOrder.length) {
        endGame();
        return;
    }

    const { category, index } = questionsOrder[currentQuestionIndex];
    const questionData = gameData.categories[category].questions[index];
    currentCategory = category;

    const oldFeedback = document.querySelector('.feedback-message');
    if (oldFeedback) {
        oldFeedback.remove();
    }

    updateCategoryImages(category);
    
    document.getElementById('category-title').textContent = gameData.categories[category].name;
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = questionsOrder.length;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const { category, index } = questionsOrder[currentQuestionIndex];
    const questionData = gameData.categories[category].questions[index];
    const correctAnswer = questionData.correct;
    
    // השבת כל הכפתורים
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.classList.add('disabled');
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
        if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add('wrong');
        }
    });

    // יצירת הודעת משוב
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback-message ${selectedAnswer === correctAnswer ? 'feedback-correct' : 'feedback-wrong'}`;
    
    if (selectedAnswer === correctAnswer) {
        feedbackDiv.innerHTML = `<strong>נכון מאוד!</strong>`;
        currentScore += 10;
        
        // מעבר אוטומטי לשאלה הבאה אחרי 2 שניות
        setTimeout(() => {
            moveToNextQuestion();
        }, 2000);
    } else {
        feedbackDiv.innerHTML = `
            <strong>לא נכון.</strong><br>
            התשובה הנכונה היא: ${correctAnswer}<br>
            <div class="feedback-explanation">${questionExplanations[category][index]}</div>
            <button class="next-question-btn" onclick="moveToNextQuestion()">לשאלה הבאה</button>
        `;
    }

    // הוספת המשוב למסך
    const questionContainer = document.querySelector('.question-container');
    questionContainer.appendChild(feedbackDiv);
    
    // עדכון הניקוד
    document.getElementById('score').textContent = currentScore;
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    showNextQuestion();
}
function moveToNextQuestion() {
    currentQuestionIndex++;
    showNextQuestion();
}

function endGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = currentScore;
    saveScore();
}

function saveScore() {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '[]');
    
    const newScore = {
        playerName: currentPlayer,
        score: currentScore,
        date: new Date().toLocaleDateString('he-IL')
    };
    
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    
    localStorage.setItem('gameScores', JSON.stringify(scores));
    showLeaderboard();
}

function showLeaderboard() {
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('leaderboard').classList.remove('hidden');
    
    const scores = JSON.parse(localStorage.getItem('gameScores') || '[]');
    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    
    scores.slice(0, 5).forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.playerName}</td>
            <td>${score.score}</td>
            <td>${score.date}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function restartGame() {
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('leaderboard').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('player-name').value = '';
}

function resetAllScores() {
    if (confirm('האם אתה בטוח שברצונך למחוק את כל התוצאות?')) {
        localStorage.removeItem('gameScores');
        showLeaderboard();
    }
}