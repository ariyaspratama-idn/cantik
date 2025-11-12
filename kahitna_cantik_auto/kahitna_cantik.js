const audio = document.getElementById('audio');
const lyricsContainer = document.getElementById('lyrics');
const playButton = document.getElementById('playButton');

// [waktu (detik), teks, emoji]
const lyrics = [
  [12, "Cantik", "💖"],
  [15, "Ingin rasa hati berbisik", "💞"],
  [21, "Untuk melepas keresahan dirimu", "🌸"],
  [29, "Oh cantik", "🌷"],
  [33, "Bukan ku ingin mengganggumu", "🌹"],
  [39, "Tapi apa arti merindu ", "🎵"],
  [44, "Selalu", "💔"],
  [46, "Wow Wow Wow .....", "💫"],
  [48, "Walau mentari terbit di utara", "☀️"],
  [54, "Hatiku hanya untukmu", "💘"],
  [59, "Ada hati yang termanis dan penuh cinta", "💐"],
  [64, "Tentu saja kan kubalas seisi jiwa", "💓"],
  [70, "Tiada lagi, tiada lagi yang ganggu kita", "🌈"],
  [76, "Ini kesungguhan", "💍"],
  [80, "Sungguh aku sayang kamu", "❤️"],
  [88, "mau gak jadi pasangan ku 💍", ""],
];

let lastIndex = -1;
let currentLineDiv = null;
let currentEmoji = null;

// klik tombol hati → mulai audio
playButton.addEventListener('click', () => {
  audio.play().then(() => {
    playButton.style.display = 'none';
  }).catch(err => {
    console.error("Audio tidak bisa diputar:", err);
    alert("Klik lagi atau cek volume browser Anda");
  });
});

// fungsi buat menampilkan lirik dan emoji
function showLine(text, emo, index) {
  // hapus lirik sebelumnya
  if (currentLineDiv) {
    currentLineDiv.classList.remove('show');
    if (currentEmoji) currentEmoji.remove();
  }

  // buat lirik baru
  const lineDiv = document.createElement('div');
  lineDiv.className = 'line show';
  lineDiv.textContent = text;
  lyricsContainer.appendChild(lineDiv);
  currentLineDiv = lineDiv;

  // emoji pop-up
  if (emo) {
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'emoji';
    emojiDiv.textContent = emo;
    emojiDiv.style.right = index % 2 === 0 ? "-60px" : "unset";
    emojiDiv.style.left = index % 2 !== 0 ? "-60px" : "unset";
    lineDiv.appendChild(emojiDiv);
    currentEmoji = emojiDiv;

    setTimeout(() => {
      if (emojiDiv) emojiDiv.remove();
    }, 1500);
  }
}

// update lirik sesuai waktu audio
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;

  // cek semua lirik
  for (let i = 0; i < lyrics.length; i++) {
    const [time, text, emo] = lyrics[i];

    // tampilkan jika waktu audio >= timestamp lirik dan belum tampil
    if (currentTime >= time && lastIndex < i) {
      lastIndex = i;
      showLine(text, emo, i);
      break; // hanya satu lirik muncul setiap update
    }
  }
});
