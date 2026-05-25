function playAudio(file) {

  const player =
    document.getElementById('audioPlayer') || new Audio();

  if (!document.getElementById('audioPlayer')) {

    player.id = 'audioPlayer';

    document.body.appendChild(player);
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

  if (!quizCard) {

    alert(
      'Quiz card not found. Make sure the question is inside class="card quiz-card".'
    );

    return;
  }

  let result =
    quizCard.querySelector('.quiz-result');

  if (!result) {

    result =
      document.createElement('p');

    result.className =
      'quiz-result';

    quizCard.appendChild(result);
  }

  if (isCorrect) {

    result.textContent =
      'Correct! Great job!';

    result.style.color =
      '#1fa55b';

    result.style.fontWeight =
      '700';

  } else {

    result.textContent =
      'Try again!';

    result.style.color =
      '#d63c3c';

    result.style.fontWeight =
      '700';
  }
}