interface StatCardProps {
  label: string
  value: number
  description: string
}

function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{description}</small>
    </div>
  )
}

export default StatCard