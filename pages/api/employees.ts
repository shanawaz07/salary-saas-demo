
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const sb = createClient(url, serviceKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await sb.from('employees').select('id, employee_id, name, job_station, status, department_id, designation_id').order('name')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  } else if (req.method === 'POST') {
    const body = req.body
    const { data, error } = await sb.from('employees').insert([body]).select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data[0])
  }
  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
