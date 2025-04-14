document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Display a response message
    const responseDiv = document.getElementById('formResponse');
    responseDiv.innerHTML = `<p>Terima kasih, ${name}! Pesan Anda telah diterima.</p>`;
    
    // Clear the form
    this.reset();
});

// Cursor click effect
const cursorEffect = document.createElement('div');
cursorEffect.classList.add('cursor-effect');
document.body.appendChild(cursorEffect);

document.addEventListener('click', (e) => {
    cursorEffect.style.left = `${e.pageX}px`;
    cursorEffect.style.top = `${e.pageY}px`;
    cursorEffect.style.opacity = '1';
    cursorEffect.style.transform = 'scale(1.5)';

    setTimeout(() => {
        cursorEffect.style.opacity = '0';
        cursorEffect.style.transform = 'scale(1)';
    }, 200);
});
