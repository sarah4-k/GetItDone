const messages = [
  {
    text: "أنت أقوى مما تظن، استمر",
    image: "/images/m1.png"
  },
  {
    text: "كل مهمة تنهيها تقربك من هدفك",
    image: "/images/m2.png"
  },
  {
    text: "النجاح يبدأ بخطوة، خذها الآن",
    image: "/images/m3.png"
  },
  {
    text: "لا تؤجل عمل اليوم إلى الغد",
    image: "/images/m4.png"
  },
  {
    text: "كل إنجاز صغير يُحدث فرقًا كبيرًا",
    image: "/images/m5.png"
  },
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

module.exports = getRandomMessage;
