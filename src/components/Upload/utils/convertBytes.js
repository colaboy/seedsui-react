function convertBytes(bytes, targetUnit = 'MB') {
  const units = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4
  }

  const unit = targetUnit.toUpperCase()
  if (!units?.[unit] || typeof bytes !== 'number') {
    return 0
  }

  return bytes / units[unit]
}

export default convertBytes
