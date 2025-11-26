
import Head from 'next/head'
import Link from 'next/link'
export default function Layout({ children, title = 'Salary SaaS' }: any) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header style={{ background:'#fff', padding:12, borderBottom:'1px solid #eee' }}>
        <div className="container" style={{ display:'flex', gap:12, alignItems:'center' }}>
          <Link href="/"><a style={{ fontWeight:700, color:'#0b5fff' }}>Salary SaaS</a></Link>
          <nav><Link href="/employees"><a style={{ marginRight:8 }}>Employees</a></Link><Link href="/payroll"><a>Payroll</a></Link></nav>
        </div>
      </header>
      <main>{children}</main>
      <footer style={{ textAlign:'center', padding:12, color:'#666' }}>© {new Date().getFullYear()} Salary SaaS</footer>
    </div>
  )
}
