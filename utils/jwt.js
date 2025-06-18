const jwt = require("jsonwebtoken");

const SECRET_KEY = "hello";
const JWT = {
  // 生成token
  generate(data, expiresIn = "1h") {
    // data：用户信息  expiresIn：token过期时间
    return jwt.sign(data, SECRET_KEY, { expiresIn: expiresIn });
  },
  // 验证及解析token
  verify(token) {
    try {
      // 解码token
      const decodedData = jwt.verify(token, SECRET_KEY);
      return decodedData;
    } catch (err) {
      // JWT验证失败
      console.log(err);
      return false;
    }
  },
};

module.exports = JWT;
