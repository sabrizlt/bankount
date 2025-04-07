import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/home');
    } else {
      alert(data.error || 'Credenziali errate');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        className="mb-2 p-2 border"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="mb-2 p-2 border"
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4">
        Non hai un account?{' '}
        <a
          href="/register"
          className="text-blue-500"
        >
          Registrati qui
        </a>
      </p>
    </div>
  );
}
