function getStrength(password) {
  if (password.length === 0) return 0

  let matches = 0
  password.match(/[a-z]/g) && matches++
  password.match(/[A-Z]/g) && matches++
  password.match(/[0-9]/g) && matches++
  password.match(/[^a-zA-Z0-9]/g) && matches++

  if (matches === 3) {
    return 2
  }

  if (matches > 3) {
    if (password.length > 8) return 3
    return 2
  }

  return 1
}

export default getStrength
