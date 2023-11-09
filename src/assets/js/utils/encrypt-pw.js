const bcrypt = require('bcrypt');
const saltRounds = 10
// 处理加盐数据的开销，默认为10
const passwordEncrypt = async password => {
  return await bcrypt.hash(password, saltRounds)
}
// 需要对比输入的明文密码和哈希及加盐后的密码时 用bcrypt的compare方法
const checkPassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(hashedPassword, plainTextPassword)
}
// 密码加密后才能放心存入数据库