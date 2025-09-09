document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('request-form');
  const submitBtn = document.getElementById('submit-btn');
  const errorBox = document.getElementById('error-box');
  const passwordInput = document.getElementById('password');

  function validatePassword() {
    const pwd = passwordInput.value || '';
    if (pwd.length < 8) {
      errorBox.textContent = 'Пароль должен содержать минимум 8 символов.';
      errorBox.style.display = 'block';
      return false;
    }
    errorBox.textContent = '';
    errorBox.style.display = 'none';
    return true;
  }

  passwordInput.addEventListener('input', validatePassword);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.style.display = 'none';
    errorBox.textContent = '';

    if (!validatePassword()) {
      passwordInput.focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;

    const payload = { email, password, gender };

    console.log('Request payload:', payload);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Server response:', data);
    } catch (err) {
      console.error('Request failed:', err);
      errorBox.textContent = 'Не удалось выполнить запрос. Проверьте соединение и попробуйте снова.';
      errorBox.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить запрос';
    }
  });
});


