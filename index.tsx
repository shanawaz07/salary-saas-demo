
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout title="Dashboard">
      <div className="container">
        <div className="card">
          <h1>Salary SaaS — Dashboard</h1>
          <p>Welcome. Use the links below to go to modules.</p>
          <p><Link href='/employees'><a>Employees</a></Link> | <Link href='/payroll'><a>Payroll</a></Link></p>
        </div>
      </div>
    </Layout>
  )
}
