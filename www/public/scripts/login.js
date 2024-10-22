document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Zarejestrowano pomyślnie!');
      window.location.href = 'login.html'; // Przekierowanie do logowania
    } else {
      alert('Błąd: ' + data.message);
    }
  });
  
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Zalogowano pomyślnie!');
      // Przechowywanie tokenu JWT w localStorage
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html'; // Przekierowanie na stronę główną
    } else {
      alert('Błąd: ' + data.message);
    }
  });