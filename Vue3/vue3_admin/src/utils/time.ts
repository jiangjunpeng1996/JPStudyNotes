// 封装一个函数，用来获取一个结果：当前是早上｜上午｜下午｜晚上
export const getTime = () => {
  let message = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 14) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}