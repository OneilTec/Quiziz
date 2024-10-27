const questions = [
    {
        question: "Who is the hero of the story?",
        choices: ["Marshall D. Teach", "Jaguar D. Saul", "Monkey D. Luffy", "Trafalgar D. Water Law"],
        correct: 2,
    },
    {
        question: "Who made Crocodile join Luffy's \"Rescue Ace Crew\"?",
        choices: ["Luffy", "Jinbe", "Ace", "Ivankov"],
        correct: 3,
    },
    {
        question: "Who sucks all of the poison out of Luffy's body?",
        choices: ["Reiju", "Nami", "Hancock", "Robin"],
        correct: 0,
    },
    {
        question: "Who was the first marine Admiral to be shown in the series?",
        choices: ["Akainu", "Kizaru", "Aokiji", "Sengoku"],
        correct: 2,
    },
    {
        question: "Who gave Shanks the scar on his eye?",
        choices: ["Monkey D. Dragon", "Marshall D. Teach", "Akainu", "Himself"],
        correct: 1,
    },
    {
        question: "How long did Portgas D. Rouge's pregnancy last?",
        choices: ["Eight months", "Twelve months", "Sixteen months", "Twenty months"],
        correct: 3,
    },
    {
        question: "Where did Bartholomew Kuma send Nami?",
        choices: ["A small sky island that specializes in weather research", "A carnivorous island that eats people and animals", "To the Revolutionary Army", "Whiskey Peak"],
        correct: 0,
    },
    {
        question: "Who does Luffy defeat just before reaching Ace during the Marineford Arc?",
        choices: [" Admiral Aokiji", " Fleet Admiral Sengoku", "Monkey D. Garp", " Marshall D. Teach"],
        correct: 2,
    },
    {
        question: "What is the fake Robin's name in the impostor Straw Hats crew at Saboady Archipelago?",
        choices: ["Shakki", "Heba", "Ria", "Cocoa"],
        correct: 3,
    },
    {
        question: "What color is the Buster Call Den Den Mushi?",
        choices: ["Pink", "Gold", "Red", "Orange"],
        correct: 1,
    },
    {
        question: "What is the name of the island on which the Davy Back Fight takes place?",
        choices: ["Long Ring Long Land", "Tonjit Island", "Donut Land", "Papanapple Island"],
        correct: 0,
    },
    {
        question: "What do the Straw Hats use to escape from G-8, the Navy base, after they fell from Skypiea?",
        choices: ["A balloon", "A giant bird", "A bumblebee", "An octopus"],
        correct: 3,
    },
    {
        question: "In the Alabasta Arc/Baroque Works Arc, what is Mr. 2's Devil Fruit power?",
        choices: ["Gomu Gomu no Mi (Rubber)", "Hana Hana no Mi (Flower)", "Mane Mane no Mi (Copy)", "Nero Nero no Mi (Slow)"],
        correct: 2,
    },
    {
        question: "Who is the Straw Hats' first mate?",
        choices: ["Roronoa Zoro", "Sanji", "Usopp", "Nami"],
        correct: 0,
    },
    {
        question: "Who gave Luffy his trademark straw hat?",
        choices: ["Monkey D. Dragon", "Shanks", "Nami", "Gold Roger"],
        correct: 1,
    },
    {
        question: "Who is the fifth crew member to officially join?",
        choices: ["Sanji", "Tony Tony Chopper", "Usopp", "Nami"],
        correct: 3,
    },
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0; // Track the score

const questionElement = document.getElementById("Question");
const choicesElement = document.getElementById("Choices");
const nextButton = document.getElementById("Next_btn");

function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    choicesElement.innerHTML = "";
    selectedAnswer = null;

    current.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.classList.add("Choice");
        button.textContent = choice;
        button.dataset.answer = index === current.correct ? "correct" : "wrong";
        button.onclick = handleChoiceClick;
        choicesElement.appendChild(button);
    });

    nextButton.disabled = true; // Disable Next button initially
    nextButton.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next"; // Change button text
}

function handleChoiceClick(event) {
    const selectedButton = event.target;
    selectedAnswer = selectedButton.dataset.answer;

    if (selectedAnswer === "correct") {
        score++; // Increment score for correct answer
        selectedButton.style.backgroundColor = "#00ff7f80";
    } else {
        selectedButton.style.backgroundColor = "#dd364dcc";
        const correctButton = Array.from(choicesElement.children).find(
            button => button.dataset.answer === "correct"
        );
        if (correctButton) {
            correctButton.style.backgroundColor = "#00ff7f80";
        }
    }

    Array.from(choicesElement.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.disabled = false; // Enable Next button after selection
}

nextButton.onclick = () => {
    if (!selectedAnswer) return;

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        // Disable further interaction after the last question
        questionElement.textContent = "Quiz Finished!";
        choicesElement.innerHTML = ""; // Clear choices
        nextButton.style.display = "none"; // Hide the Next button
        
        // Change the margin of the audio tag to 0
        const audioElement = document.getElementById('audio_Ctrl');
        audioElement.style.display = "none";
    }
};

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const audioRange = document.getElementById('audioRange');
const muteBtn = document.getElementById('muteBtn');

// Update the range slider as the audio plays
audio.addEventListener('timeupdate', () => {
    audioRange.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Play/Pause button functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Seek functionality
audioRange.addEventListener('input', (event) => {
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Mute/Unmute button functionality
muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

loadQuestion();

