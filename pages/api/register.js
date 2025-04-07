import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Verifica se l'email è già presente nel database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    try {
      // Crea il nuovo utente
      const user = await prisma.user.create({
        data: {
          email,
          password, // In una vera applicazione, dovresti cifrare la password
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'User creation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
