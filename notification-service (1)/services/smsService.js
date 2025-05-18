exports.send = async (notification) => {
  console.log(`Mock SMS to user: ${notification.message}`);
  if (Math.random() < 0.2) throw new Error('SMS failed');
};
