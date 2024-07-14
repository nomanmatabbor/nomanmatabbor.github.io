// scripts.js
function generateRandomCode() {
    const codeLength = 12;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    // Insert hyphens after every 4 characters
    const formattedCode = code.replace(/(.{4})/g, '$1-').slice(0, -1);

    return formattedCode;
}

const modalText = document.getElementById('modalText');
const verifyButton = document.getElementById('verifyButton');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const modalTitle = document.getElementById('modalTitle');
        modalTitle.textContent = "Code is Generating...";

        let currentCode = generateRandomCode();
        modalText.textContent = currentCode;

        const interval = setInterval(() => {
            currentCode = generateRandomCode();
            modalText.textContent = currentCode;
        }, 50); // Adjust the interval here (in milliseconds)

        setTimeout(() => {
            clearInterval(interval);
            modalText.textContent = currentCode.slice(0, -4) + "XXXX";
            verifyButton.style.display = "block";
        }, 10000);
    });
});
