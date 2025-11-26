
import useSWR from 'swr'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'

const fetcher = (url: string) => fetch(url).then(r=>r.json())

export default function EmployeesPage() {
  const { data, error } = useSWR('/api/employees', fetcher)
  if (error) return <Layout><div className="container"><div className="card">Error: {error.message}</div></div></Layout>
  if (!data) return <Layout><div className="container"><div className="card">Loading...</div></div></Layout>
  return (
    <Layout title="Employees">
      <div className="container">
        <div className="card">
          <h2>Employees</h2>
          <DataTable rows={data} columns={['employee_id','name','department','designation','job_station','status']} />
        </div>
      </div>
    </Layout>
  )
}
