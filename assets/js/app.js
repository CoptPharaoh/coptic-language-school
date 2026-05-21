function playAudio(file){
  const player = document.getElementById('audioPlayer') || new Audio();
  if(!document.getElementById('audioPlayer')) player.id='audioPlayer';
  player.src = file;
  player.play().catch(()=>alert('Audio file missing or blocked. Add the MP3 file to assets/audio and try again.'));
}
function flipCard(el){el.classList.toggle('flipped')}
