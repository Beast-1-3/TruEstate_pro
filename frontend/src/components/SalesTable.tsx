export default function SalesTable({ sales }) {
  if (!sales) return <div>No data</div>;
  return (
    <table>
      <tbody>
        {sales.map(s => <tr key={s._id}><td>{s.storeLocation}</td></tr>)}
      </tbody>
    </table>
  );
}
