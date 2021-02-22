// 创建canvas元素
export function generateCanvas({ w = 0, h = 0 }) {
  const can = document.createElement('canvas')
  const ctx = can.getContext('2d')
  can.width = w
  can.height = h
  return { can, ctx }
}