import request from "../utils/request"

export function test() {
  return request({
    url: "user/login",
    method: "post",
    data: {
      username: "Zhudi",
      password: "123456",
    },
  })
}
