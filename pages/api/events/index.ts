// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Event } from '@firebase/Events/event.model'
import { getEvents } from '@firebase/Events/main'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  events: Event[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const events = await getEvents()
  res.status(200).json({ events })
}
