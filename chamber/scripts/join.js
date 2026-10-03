
const timestampInput = document.querySelector('#timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal(); // Opens the <dialog>
        }
    });
});

// Close modal
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.closest('dialog').close();
    });
});
