
export const mobilePattern = function () {
  let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
  return reg
}
export const emailPattern = function () {
  return ''
}
export const loginNamePattern = function () {
  return '^([+]?(([1-9]\d*(\.\d{1,2})?)|0\.(([1-9]\d?)|(\d[1-9]))))$'
}
export const passwordPattern = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/)
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$

