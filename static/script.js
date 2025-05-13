document.addEventListener('DOMContentLoaded', function() {
    // Schedule management
    const editButtons = document.querySelectorAll('.edit-btn');
    const saveButtons = document.querySelectorAll('.save-btn');
    const nameDisplays = document.querySelectorAll('.name-display');
    const nameInputs = document.querySelectorAll('.name-input');

    editButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            nameDisplays[index].style.display = 'none';
            nameInputs[index].style.display = 'block';
            btn.style.display = 'none';
            saveButtons[index].style.display = 'inline-block';
        });
    });

    saveButtons.forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            const day = btn.closest('tr').querySelector('td').textContent;
            const name = nameInputs[index].value;

            try {
                const response = await fetch('/update_schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ day, name }),
                });

                if (response.ok) {
                    nameDisplays[index].textContent = name;
                    nameDisplays[index].style.display = 'block';
                    nameInputs[index].style.display = 'none';
                    btn.style.display = 'none';
                    editButtons[index].style.display = 'inline-block';
                    showToast('Schedule updated successfully!');
                } else {
                    throw new Error('Failed to update schedule');
                }
            } catch (error) {
                showToast('Error updating schedule', true);
            }
        });
    });

    // Attach the sendEmail handler to the button
    const sendEmailBtn = document.getElementById('sendEmail');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', sendEmail);
    }

    async function sendEmail() {
        try {
            const response = await fetch('/send_email', {
                method: 'POST',
            });
            const data = await response.json();
            showToast(data.message, data.status === 'error');
        } catch (error) {
            showToast('Error sending email', true);
        }
    }

    // Toast notification
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        toast.style.backgroundColor = isError ? 'var(--danger-color)' : 'var(--primary-color)';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !emailInput.value) {
                event.preventDefault();
                showToast('Please enter an email address', true);
            }
        });
    });
}); 