const express = require("express");
const router = express.Router();

const JWT = require("../utils/jwt");

// 登录
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == "admin" && password == "123") {
    const token = JWT.generate({
      userid: "001",
      username: "admin",
      nickname: "超级管理员",
    });
    res.send({
      status: "ok",
      msg: "登录成功",
      data: {
        userid: "001",
        nickname: "超级管理员",
        token,
      },
    });
  } else {
    res.status(403).send({
      status: "error",
      msg: "用户名或密码错误",
    });
  }
});

// 登出

module.exports = router;
