import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Benvenuto, {user.email}</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
    </div>
  );
}
