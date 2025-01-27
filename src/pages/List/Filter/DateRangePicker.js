import DateRangeFilter from 'library/components/DateRangeFilter'

function DateRangePicker({ value, onChange }) {
  return (
    <div style={{ padding: '10px 0', marginRight: '12px' }}>
      <DateRangeFilter value={value} onChange={onChange} />
    </div>
  )
}
export default DateRangePicker
