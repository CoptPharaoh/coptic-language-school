function playAudio(file) {
  const player =
    document.getElementById("audioPlayer") || new Audio();

  if (!document.getElementById("audioPlayer")) {
    player.id = "audioPlayer";
    document.body.appendChild(player);
  }

  player.src = file;

  player.play().catch(() =>
    alert(
      "Audio file missing or blocked. Add the audio file to assets/audio and try again."
    )
  );
}

function flipCard(el) {
  el.classList.toggle("flipped");
}

function checkAnswer(button, isCorrect) {
  const quizCard = button.closest(".quiz-card");

  if (!quizCard) {
    alert(
      'Quiz card not found. Make sure the question is inside class="card quiz-card".'
    );
    return;
  }

  let result = quizCard.querySelector(".quiz-result");

  if (!result) {
    result = document.createElement("p");
    result.className = "quiz-result";
    quizCard.appendChild(result);
  }

  if (isCorrect) {
    result.textContent = "Correct! Great job!";
    result.style.color = "#1fa55b";
    result.style.fontWeight = "700";
  } else {
    result.textContent = "Try again!";
    result.style.color = "#d63c3c";
    result.style.fontWeight = "700";
  }
}

/* Matching Activity */

let currentMatch = null;
let matchProgress = {};

function shuffleArray(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function shuffleMatchingButtons() {
  document.querySelectorAll(".match-column").forEach((column) => {
    const buttons = Array.from(column.querySelectorAll(".match-btn"));
    shuffleArray(buttons).forEach((button) => {
      column.appendChild(button);
    });
  });
}

document.addEventListener("DOMContentLoaded", shuffleMatchingButtons);

document.addEventListener("click", function (event) {
  const btn = event.target.closest(".match-btn");
  if (!btn) return;

  const group = btn.dataset.group;
  const type = btn.dataset.type;
  const status = document.getElementById("matchStatus");
  const board = btn.closest(".matching-board");
  const requiredMatches = Number(board?.dataset.requiredMatches || 3);

  if (!status) return;

  if (!currentMatch) {
    currentMatch = {
      group: group,
      types: [type],
    };

    btn.classList.add("selected");
    status.textContent = "Good. Now choose the matching item.";
    return;
  }

  if (
    currentMatch.group === group &&
    !currentMatch.types.includes(type)
  ) {
    btn.classList.add("correct-match");
    currentMatch.types.push(type);

    if (!matchProgress[group]) {
      matchProgress[group] = [];
    }

    matchProgress[group].push(type);

    status.textContent = "Correct! Keep matching.";

    if (currentMatch.types.length >= requiredMatches) {
      document
        .querySelectorAll(`.match-btn[data-group="${group}"]`)
        .forEach((item) => {
          item.classList.add("completed-match");
          item.classList.remove("selected");
        });

      status.textContent = "Great job! That set is complete.";
      currentMatch = null;
    }
  } else {
    btn.classList.add("wrong-match");
    status.textContent = "Try again! Look carefully.";

    setTimeout(() => {
      btn.classList.remove("wrong-match");
    }, 800);
  }
});

function resetMatching() {
  currentMatch = null;
  matchProgress = {};

  document.querySelectorAll(".match-btn").forEach((btn) => {
    btn.classList.remove(
      "selected",
      "correct-match",
      "wrong-match",
      "completed-match"
    );
  });

  const status = document.getElementById("matchStatus");

  if (status) {
    status.textContent = "Start by clicking an English letter.";
  }

  shuffleMatchingButtons();
}

/* Maze / Drawing Activity */

function setupMazeCanvas() {
  const canvases = document.querySelectorAll(".draw-canvas, #mazeCanvas");
  if (!canvases.length) return;

  canvases.forEach((canvas) => {
    const wrapper = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    let drawing = false;

    function resizeCanvas() {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;

      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#d63c3c";
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function getPosition(event) {
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches ? event.touches[0] : event;

      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    function startDrawing(event) {
      event.preventDefault();

      drawing = true;

      const pos = getPosition(event);

      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    function draw(event) {
      if (!drawing) return;

      event.preventDefault();

      const pos = getPosition(event);

      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    function stopDrawing() {
      drawing = false;
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);
  });
}

function clearDrawing(target) {
  const canvas =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearMaze() {
  const canvas = document.getElementById("mazeCanvas");
  clearDrawing(canvas);
}

document.addEventListener("DOMContentLoaded", setupMazeCanvas);
