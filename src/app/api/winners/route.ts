'use server'
import { NextRequest, NextResponse } from 'next/server'
import { getToken, JWT } from 'next-auth/jwt'
import { Raffles } from '@prisma/client'

//libs
import { prisma } from '@/lib/prisma'

//interface
import { IPaginationResponse } from '@/helpers/types'
import { paginationCalc } from '@/helpers/paginationCalc'

export interface IWinnersResponse {
  data: Raffles[]
  pagination: IPaginationResponse
}

export async function GET(req: NextRequest) {
  const token: Payload | null = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.userId) {
    return NextResponse.json({ message: 'Unauthorized' });
  }

  const url = new URL(req.url)
  const skip = url.searchParams.get("skip")
  const take = url.searchParams.get("take")

  const data: Raffles[] = await prisma.raffles.findMany({
    where: {
      userId: token?.userId
    },
    take: Number(take) || 10,
    skip: Number(skip) || 0,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const count = await prisma.raffles.count({
    where: {
      userId: token?.userId
    },
  })

  const pagination = paginationCalc({
    count,
    take: Number(take) || 10,
    skip: Number(skip) || 0
  })

  const response: IWinnersResponse = {
    data,
    pagination
  }

  return NextResponse.json(response)
}


interface Payload extends JWT {
  userId?: string
}

interface DataPayload {
  winner: Object
  winnerKey: string
}


export async function POST(req: NextRequest) {
  const token: Payload | null = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


  if (!token?.userId) {
    return NextResponse.json({ message: 'Unauthorized' });
  }

  const data: DataPayload = await req.json();

  await prisma.raffles.create({
    data: {
      winner: JSON.parse(JSON.stringify(data?.winner)),
      winnerKey: data?.winnerKey,
      userId: token?.userId
    }
  })

  return NextResponse.json({ message: 'Congratulations' })
}

export async function PUT() {
  return NextResponse.json({ message: 'Hello from Next.js!' })
}

export async function DELETE() {
  return NextResponse.json({ message: 'Hello from Next.js!' })
}