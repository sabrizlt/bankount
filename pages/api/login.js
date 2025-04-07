import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Qui dovresti confrontare la password (deve essere cifrata in produzione)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Successo, restituire l'utente (o un token JWT per autenticazione)
    return res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
