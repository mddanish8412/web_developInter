// Get references to the HTML elements
const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const downloadBtn = document.getElementById('download-btn');

// Initialize a variable for the QRCode instance
let qrcode = null;

// Function to generate the QR code
const generateQRCode = () => {
    const text = qrInput.value.trim();

    // 6. Error Handling: Check if the input is empty
    if (text === '') {
        alert('Please enter a text or URL!');
        qrInput.focus();
        return;
    }

    // Clear any previous QR code
    qrCodeContainer.innerHTML = '';
    downloadBtn.classList.remove('show'); // Hide download button

    // 4. Generate QR code using the qrcode.js library
    // Create a new QRCode instance
    qrcode = new QRCode(qrCodeContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show the download button after a short delay
    // to ensure the canvas has been rendered
    setTimeout(setupDownloadLink, 100);
};

// Function to set up the download link
const setupDownloadLink = () => {
    // The library generates the QR code in a <canvas> element.
    // We can convert this canvas to a data URL to make it downloadable.
    const canvas = qrCodeContainer.querySelector('canvas');
    if (canvas) {
        const imageUrl = canvas.toDataURL('image/png');
        downloadBtn.href = imageUrl;
        downloadBtn.classList.add('show'); // Make download button visible
    }
};

// 3. Attach event listener to the generate button
generateBtn.addEventListener('click', generateQRCode);

// Optional: Allow pressing 'Enter' to generate
qrInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

// Optional UX improvement: Hide download link when user starts typing again
qrInput.addEventListener('input', () => {
    downloadBtn.classList.remove('show');
});