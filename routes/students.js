const express = require("express");
const router = express.Router();

let STUDENTS_ARR = [
  { "id": "1", "name": "张三", "age": 18, "gender": "男" },
  { "id": "2", "name": "李四", "age": 20, "gender": "女" },
  { "id": "3", "name": "王五", "age": 28, "gender": "女" },
];

// 获取所有学生
router.get("/students", (req, res) => {
  res.send({
    status: "ok",
    msg: "成功",
    data: STUDENTS_ARR,
  });
});

// 获取某个学生信息
router.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const stu = STUDENTS_ARR.find(item => item.id == id);
  if (stu && Object.keys(stu).length > 0) {
    res.send({
      status: "ok",
      msg: "成功",
      data: stu,
    });
  } else {
    res.status(403).send({
      status: "error",
      msg: "学生id不存在",
    });
  }
});

// 新增学生
router.post("/students", (req, res) => {
  console.log(req.body);
  const id = Number(STUDENTS_ARR.at(-1).id) + 1 + "";
  const stu = {
    id: id,
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
  };
  STUDENTS_ARR.push(stu);
  res.send({
    status: "ok",
    msg: "新增成功",
    data: stu,
  });
});

// 修改学生信息
router.patch("/students/:id", (req, res) => {
  const id = req.params.id;
  const stu = STUDENTS_ARR.find(item => item.id == id);
  if (stu && Object.keys(stu).length > 0) {
    stu.name = req.body.name ? req.body.name : stu.name;
    stu.age = req.body.age ? +req.body.age : stu.age;
    stu.gender = req.body.gender ? req.body.gender : stu.gender;
    res.send({
      status: "ok",
      msg: "修改成功",
      data: stu,
    });
  } else {
    res.status(403).send({
      status: "error",
      msg: "学生id不存在",
    });
  }
});

// 批量删除学生
router.delete("/students", (req, res) => {
  const ids = req.query.ids;
  STUDENTS_ARR = STUDENTS_ARR.filter(item => {
    return ids.indexOf(item.id) == -1;
  });
  res.send({
    status: "ok",
    msg: "删除成功",
    data: STUDENTS_ARR,
  });
});

module.exports = router;
