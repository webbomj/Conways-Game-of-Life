let AppContainer = document.getElementById('App')
//Create table
let tablesSize = 25
let allBoxes = []

let createTable = (size) => {
  let arr = Array(size).fill('1')
  let div = document.createElement('div')
  div.classList.add('block')
  div.addEventListener('click', () => startGeneration())
  AppContainer.append(div)
  arr.forEach(el => {
    let tr = document.createElement('tr')
    let arrOfTr = []
    arr.forEach(el => {
      let td = document.createElement('td')
      td.classList.add('block')
      tr.append(td)
      arrOfTr.push(td)
    })
    AppContainer.append(tr)
    allBoxes.push(arrOfTr)
  })
}
createTable(tablesSize)

//Create live
let mouseDown = false
AppContainer.addEventListener('mousedown', () => mouseDown = true)
AppContainer.addEventListener('mouseup', () => mouseDown = false)
AppContainer.addEventListener('mousemove', (e) => createLife(e))

let createLife = (e) => {
  if (!mouseDown) return
  if (e.target.tagName === 'TD') {
    e.target.classList.add('alive')
  }
}

// Start Generation
let startGeneration = () => {
  console.log('start')

  //Start Comparison
  let start = () => {
    let arrOfTrNodes = []
    allBoxes.forEach((tr, idxTr) => {
      tr.forEach((td, tdIdx) => {
        let aliveBlock = td.classList.contains('alive')

        let quantityNeighbors = countNeighbors(idxTr, tdIdx)

        if ((quantityNeighbors === 2 || quantityNeighbors === 3) && aliveBlock === true) {
          return
        }
        if (quantityNeighbors <= 1 && aliveBlock === true) {
          arrOfTrNodes.push(td)
          // td.classList.remove('alive')
        }

        if (quantityNeighbors > 3 && aliveBlock === true) {
          arrOfTrNodes.push(td)
          // td.classList.remove('alive')
        }

        if (quantityNeighbors === 3 && aliveBlock === false) {
          arrOfTrNodes.push(td)
          // td.classList.add('alive')
        }
        
      })
    })
    changeClasses(arrOfTrNodes)
  }
  setInterval(() => start(), 100)
}

// Change Blocks
let changeClasses = (arrOfNode = []) => {
  arrOfNode.forEach(td => {
    let aliveBlock = td.classList.contains('alive')
    if (aliveBlock) {
      td.classList.remove('alive')
    } else {
      td.classList.add('alive')
    }
  })
}

// Count neighbors
let countNeighbors = (idxTr, idxTd) => {
  let right = idxTd + 1, 
      left = idxTd - 1,
      middleY = idxTd,
      middleX = idxTr,
      top = idxTr - 1,
      bot = idxTr + 1

  //create last Column/Row in table
  let lastTdAndTr = tablesSize - 1 

  if (idxTr === 0) {
    top = lastTdAndTr
  }
  if (idxTr === lastTdAndTr) {
    bot = 0
  }
  if (idxTd === 0) {
    left = lastTdAndTr
  }
  if (idxTd === lastTdAndTr) {
    right = 0
  }

  //neighbors
  let topLeft = allBoxes[top][left]
  let topRight = allBoxes[top][right]
  let topMiddle = allBoxes[top][middleY]
  let bottomLeft = allBoxes[bot][left]
  let bottomRight = allBoxes[bot][right]
  let bottomMiddle = allBoxes[bot][middleY]
  let middleLeft = allBoxes[middleX][left]
  let middleRight = allBoxes[middleX][right]  

  let count = 0;

  let quantityNeighbors = [
    topLeft, topRight, topMiddle, bottomLeft, bottomRight, bottomMiddle, middleLeft, middleRight
  ].forEach(el => {
    let isAlive = el.classList.contains('alive')
    count += isAlive
  })
  return count
}