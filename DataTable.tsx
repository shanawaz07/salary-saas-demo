
export default function DataTable({ rows, columns }: any) {
  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead><tr>{columns.map((c:any)=> <th key={c} style={{ textAlign:'left', padding:8, borderBottom:'1px solid #eee' }}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r:any, idx:number)=> <tr key={r.id||idx} style={{ background: idx%2? '#fff':'#fafafa' }}>{columns.map((c:any)=> <td key={c} style={{ padding:8 }}>{String(r[c] ?? '—')}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}
