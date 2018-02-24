var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

var using = false
var eraserUsing = false

autoSetSize()

eraser.onclick = function () {
  eraserUsing = !eraserUsing
  actions.className = 'actions active'
}
brush.onclick = function () {
  eraserUsing = !eraserUsing
  actions.className = 'actions'
}

listenToMouse()





/*************** */
function listenToMouse() {
  var oldPoint, newPoint

  canvas.onmousedown = function (xxx) {
    using = true
    oldPoint = setPoint(xxx.clientX, xxx.clientY)
    if (eraserUsing) {
      context.clearRect(xxx.clientX - 5, xxx.clientY - 5, 10, 10)
    } else {
      draw(xxx.clientX, xxx.clientY, 5)
    }
  }
  canvas.onmousemove = function (xxx) {
    if (using) {
      newPoint = setPoint(xxx.clientX, xxx.clientY)
      if (eraserUsing) {
        context.clearRect(xxx.clientX - 5, xxx.clientY - 5, 10, 10)
      } else {
        drawLine(oldPoint, newPoint, 10)
      }
      oldPoint = newPoint
    }
  }
  canvas.onmouseup = function () {
    using = false
  }
}

function setPoint(x, y) {
  return {
    x: x,
    y: y
  }
}
function draw(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.fill()
  context.closePath()
}
function drawLine(oldPoint, newPoint, lineWidth) {
  context.beginPath()
  context.moveTo(oldPoint.x, oldPoint.y)
  context.lineWidth = lineWidth;
  context.lineTo(newPoint.x, newPoint.y)
  context.stroke()
  context.closePath()
}
function setSize() {
  /*动态获取浏览器的宽高并对画布进行设置 */
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}
function autoSetSize() {
  setSize()
  window.onresize = setSize
}