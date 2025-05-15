const messages = [
  {
    text: "أنت أقوى مما تظن، استمر",
    image: "/image/m1.png"
  },
  {
    text: "كل مهمة تنهيها تقربك من هدفك",
    image: "/image/m2.png"
  },
  {
    text: "النجاح يبدأ بخطوة، خذها الآن",
    image: "/image/m3.png"
  },
  {
    text: "لا تؤجل عمل اليوم إلى الغد",
    image: "/image/m4.png"
  },
  {
    text: "كل إنجاز صغير يُحدث فرقًا كبيرًا",
    image: "/image/m5.png"
  },
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

module.exports = getRandomMessage;
