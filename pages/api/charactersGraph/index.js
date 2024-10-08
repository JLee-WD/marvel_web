import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  let dbData;
  try {
    dbData = await prisma.character.findMany()
  } catch (error) {
    console.error('Error fetching db character data: ', error);
    res.status(500).json({ message: 'Error fetching db character data' });
  }
  return res.status(200).json(dbData);
}