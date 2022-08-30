import mockjs from "mockjs"

const userList = mockjs.mock({
  "data|100": [
    {
      name: "@cname",
      ename: "@name",
      "id|+1": 1,
      date: "@date",
      time: "@time",
    },
  ],
})

module.exports = [
  {
    url: "/api/users",
    method: "post",
    response: ({ body }) => {
      return {
        code: 200,
        message: "success",
        data: userList,
      }
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body }) => {
      return {
        code: 200,
        message: "success",
      }
    },
  },
]
