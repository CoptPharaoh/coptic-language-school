function playAudio(file) {

  const player =
    document.getElementById('audioPlayer') || new Audio();

  if (!document.getElementById('audioPlayer')) {
    player.id = 'audioPlayer';
  }

  player.src = file;

  player.play().catch(() =>
    alert(
      'Audio file missing or blocked. Add the audio file to assets/audio and try again.'
    )
  );
}

function flipCard(el) {
  el.classList.toggle('flipped');
}

function checkAnswer(button, isCorrect) {

  const quizCard =
    button.closest('.quiz-card');

  const result =
    quizCard.querySelector('.quiz-result');

  if (isCorrect) {

    result.textContent =
      'Correct! Great job!';

    result.style.color =
      '#1fa55b';

  } else {

    result.textContent =
      'Try again!';

    result.style.color =
      '#d63c3c';
  }
}