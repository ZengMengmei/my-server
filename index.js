const express = require("express");
const app = express();

const JWT = require("./utils/jwt");

// 引入解析中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 解决跨域问题
app.use((req, res, next) => {
  // 允许任何源访问，不安全
  // res.setHeader("Access-Control-Allow-Origin", "*");
  /**
   * 只允许指定源访问
   * 注意：Access-Control-Allow-Origin设置指定值时只能设置一个
   * 若要设置多个源都允许访问，可以判断当前源是否在这多个源中，若在则动态地设置Access-Control-Allow-Origin为指定值。
   */
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

// 权限验证
app.use((req, res, next) => {
  // 对于访问登录接口和预检请求放行
  if (req.url == "/login" || req.method == "OPTIONS") {
    next();
    return;
  }

  const token = req.headers["authorization"]?.split(" ")[1];
  const data = JWT.verify(token);
  if (data == false) {
    // JWT验证失败
    res.status(403).send({
      status: "error",
      msg: "JWT验证失败",
    });
  } else {
    // JWT验证成功
    next();
  }
});

// 引入路由
const studentsRouter = require("./routes/students");
app.use(studentsRouter);
const loginRouter = require("./routes/login");
app.use(loginRouter);

app.listen(3000, () => {
  console.log("服务器启动成功");
});
