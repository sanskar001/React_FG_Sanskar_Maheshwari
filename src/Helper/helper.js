// Function to generate unique id.

function generateUniqueId() {
  let uid = "";

  for (let i = 0; i < 16; i++) {
    const randomNumber = Math.trunc(Math.random() * 25) + 65;
    uid += String.fromCharCode(randomNumber);
  }

  return uid;
}

export { generateUniqueId };
