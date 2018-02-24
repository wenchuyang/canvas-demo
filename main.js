var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

var using = false
var eraserUsing = false

autoSetSize()

eraser.onclick = function () {
  eraserUsing = true
  brush.classList.remove('active')
  eraser.classList.add('active')
}
brush.onclick = function () {
  eraserUsing = false
  eraser.classList.remove('active')
  brush.classList.add('active')
}
download.onclick = function(){
  var url = canvas.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'myImage'
  a.target = '_blank'
  a.click()
}
clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'  
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'  
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'  
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
  black.classList.remove('active')
}
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'  
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.add('active')
}
var lineWidth = 5
thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10
}
drawBGC()
if('ontouchstart' in document.body){
  listenToTouch()  
}else{
  listenToMouse()
}


/*************** */
function listenToTouch() {
  var oldPoint, newPoint
  canvas.ontouchstart = function (xxx) {
    using = true
    oldPoint = setPoint(xxx.targetTouches[0].clientX, xxx.targetTouches[0].clientY)
    if (eraserUsing) {
      context.clearRect(xxx.targetTouches[0].clientX - 5, xxx.targetTouches[0].clientY - 5, 10, 10)
    } else {
      draw(xxx.targetTouches[0].clientX, xxx.targetTouches[0].clientY, lineWidth/2)
    }
  }
  canvas.ontouchmove = function (xxx) {
    if (using) {
      newPoint = setPoint(xxx.targetTouches[0].clientX, xxx.targetTouches[0].clientY)
      if (eraserUsing) {
        context.clearRect(xxx.targetTouches[0].clientX - 5, xxx.targetTouches[0].clientY - 5, 10, 10)
      } else {
        drawLine(oldPoint, newPoint)
      }
      oldPoint = newPoint
    }
  }
  canvas.ontouchend = function () {
    using = false
  }
}
function listenToMouse() {
  var oldPoint, newPoint
  canvas.onmousedown = function (xxx) {
    using = true
    oldPoint = setPoint(xxx.clientX, xxx.clientY)
    if (eraserUsing) {
      context.clearRect(xxx.clientX - 5, xxx.clientY - 5, 10, 10)
    } else {
      draw(xxx.clientX, xxx.clientY, lineWidth/2)
    }
  }
  canvas.onmousemove = function (xxx) {
    if (using) {
      newPoint = setPoint(xxx.clientX, xxx.clientY)
      if (eraserUsing) {
        context.clearRect(xxx.clientX - 5, xxx.clientY - 5, 10, 10)
      } else {
        drawLine(oldPoint, newPoint)
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
function drawBGC(){
  context.beginPath()
  context.moveTo(0,0)
  context.lineTo(canvas.width,0)
  context.lineTo(canvas.width,canvas.height)
  context.lineTo(0,canvas.height)
  context.fillStyle = 'white'
  context.fill()
  context.closePath()
  context.fillStyle = 'black'
}
function draw(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.fill()
  context.closePath()
}
function drawLine(oldPoint, newPoint) {
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