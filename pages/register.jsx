import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      alert('Errore nella registrazione');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input className="mb-2 p-2 border" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="mb-2 p-2 border" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRegister}>Register</button>
    </div>
  );
}
