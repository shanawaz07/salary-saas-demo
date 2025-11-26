
import useSWR from 'swr'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function PayrollPage() {
  const { data, error } = useSWR('/api/payroll', fetcher)
  if (error) return <Layout><div className="container"><div className="card">Error: {error.message}</div></div></Layout>
  if (!data) return <Layout><div className="container"><div className="card">Loading...</div></div></Layout>
  return (
    <Layout title="Payroll">
      <div className="container">
        <div className="card">
          <h2>Payroll Records</h2>
          <DataTable rows={data} columns={['id','employee_id','pay_month','gross','net_pay','status']} />
        </div>
      </div>
    </Layout>
  )
}
