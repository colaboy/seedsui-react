/*
等级0（风险密码）：密码长度小于8位，或者只包含4类字符中的任意一类，或者密码与用户名一样，或者密码是用户名的倒写。
等级1（弱密码）：包含两类字符，且组合为（数字+小写字母）或（数字+大写字母），且长度大于等于8位。
等级2（中密码）：包含两类字符，且组合不能为（数字+小写字母）和（数字+大写字母），且长度大于等于8位。
等级3（强密码）：包含三类字符及以上，且长度大于等于8位。
*/

function getStrength(password) {
  let strength = 0
  password.match(/[a-z]/g) && strength++
  password.match(/[A-Z]/g) && strength++
  password.match(/[0-9]/g) && strength++
  password.match(/[^a-zA-Z0-9]/g) && strength++
  strength = strength > 3 ? 3 : strength
  if (password.length < 8 || strength === 1) {
    strength = 0
  }
  if (strength === 2) {
    if (
      (password.match(/[0-9]/g) && password.match(/[a-z]/g)) ||
      (password.match(/[0-9]/g) && password.match(/[A-Z]/g))
    ) {
      strength = 1
    }
  }
  return strength
}

export default getStrength
