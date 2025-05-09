const messages = [
  "أنت أقوى مما تظن، استمر!",
  "كل مهمة تنهيها تقربك من هدفك!",
  "النجاح يبدأ بخطوة، خذها الآن!",
  "لا تؤجل عمل اليوم إلى الغد!",
  "كل إنجاز صغير يُحدث فرقًا كبيرًا!"
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

module.exports = getRandomMessage;