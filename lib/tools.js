// 纯粹的JS工具

// 清空obj空key
export function trimObj(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) &&
      (obj[key] === null || obj[key] === undefined)) {
      delete obj[key]
    }
  }
}