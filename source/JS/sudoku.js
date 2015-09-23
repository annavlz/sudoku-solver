var arr_diff = require('./array-diff.js')

var findBox = function(position) {
  var boxNum = Math.floor(position[0] / 3) * 3 + Math.floor(position[1] / 3)
  return boxNum
}

var getBox = function(boxNum, board) {
  var box = []
  var boxes = {
    0: [0,3,0,3],
    1: [0,3,3,6],
    2: [0,3,6,9],
    3: [3,6,0,3],
    4: [3,6,3,6],
    5: [3,6,6,9],
    6: [6,9,0,3],
    7: [6,9,3,6],
    8: [6,9,6,9]
  }
  var nums = boxes[boxNum]
  for(var x = nums[0]; x < nums[1]; x++) {
    for(var y = nums[2]; y < nums[3]; y++) {
      box.push(board[x][y])
    }
  }
  return box
}

var buildBoard = function(string) {
  var board = []
  var numbers = string.split('')
  var z = 0
  for(var x = 0; x < 9; x++) {
    var row = []
    for(var y = 0; y < 9; y++) {
      row.push(numbers[z])
      z++
    }
    board.push(row)
  }
  return board
}

var definePosition = function(board, num) {
  var position = []
    for(var x = 0; x < 9; x++) {
      for(var y = 0; y < 9; y++) {
        if(board[x][y] == num) {
          position = [x, y]
          break
        }
      }
    }
  // console.log(position);
  return position
}

var checkRow = function(board, position) {
  var row = board[position[0]]
  var solutions = []
  for(var num = 1; num < 10; num++) {
    var numString = num.toString()
    var check = []
    for(var i = 0; i < 9; i++) {

      if (numString !== row[i]) {
        check.push(row[i])
      }
    }
    if (check.length == 9) {
      solutions.push(numString)
    }
  }
  return solutions
}

var checkColumn = function(board, position, rowSolutions) {
  var column = []
  for(var i = 0; i < 9; i++) {
    column.push(board[i][position[1]])
  }
  var check = []
  for(var rowNum = 0; rowNum < rowSolutions.length; rowNum++) {
    for(var i = 0; i < 9; i++ ) {
      if(rowSolutions[rowNum] == column[i]) {
        check.push(column[i])
      }
    }
  }
  columnSolutions = arr_diff(check, rowSolutions)
  return columnSolutions
}

var checkBox = function(board, position, columnSolutions) {
  var boxNum = findBox(position)
  var boxNumbers = getBox(boxNum, board)
  var boxSolutions = []
  var check = []
  for(var colNum = 0; colNum < columnSolutions.length; colNum++) {
    for(var i = 0; i < 9; i++) {
      if(columnSolutions[colNum] == boxNumbers[i]) {
        check.push(boxNumbers[i])
      }
    }
  }
  boxSolutions = arr_diff(check, columnSolutions)
  return boxSolutions
}

Sudoku = function(boardString) {
  this.boardString = boardString
  this.board = buildBoard(this.boardString)

}

Sudoku.prototype = {
  solve: function() {
    var position = definePosition(this.board, '0')
    if(position.length == 0) {
      position = definePosition(this.board, '10')
      if(position.length == 0) {
        position = definePosition(this.board, '100')
        if(position.length == 0) {
        this.showBoard()
        } else {
          var rowSolutions = checkRow(this.board, position)
          if(rowSolutions.length == 1) {
            this.board[position[0]][position[1]] = rowSolutions[0]
            this.solve()
          } else {
            var columnSolutions = checkColumn(this.board, position, rowSolutions)
            if(columnSolutions.length == 1) {
              this.board[position[0]][position[1]] = columnSolutions[0]
              this.solve()
            } else {
              var boxSolutions = checkBox(this.board, position, columnSolutions)
              if(boxSolutions.length == 1) {
                this.board[position[0]][position[1]] = boxSolutions[0]
                this.solve()
              } else {
                // for(var i = 0; i < boxSolutions; i++) {
                  this.board[position[0]][position[1]] = 10
                  this.solve()
                // }
              }
            }
          }
        }
      } else {
        var rowSolutions = checkRow(this.board, position)
        if(rowSolutions.length == 1) {
          this.board[position[0]][position[1]] = rowSolutions[0]
          this.solve()
        } else {
          var columnSolutions = checkColumn(this.board, position, rowSolutions)
          if(columnSolutions.length == 1) {
            this.board[position[0]][position[1]] = columnSolutions[0]
            this.solve()
          } else {
            var boxSolutions = checkBox(this.board, position, columnSolutions)
            if(boxSolutions.length == 1) {
              this.board[position[0]][position[1]] = boxSolutions[0]
              this.solve()
            } else {
              // for(var i = 0; i < boxSolutions; i++) {
                this.board[position[0]][position[1]] = 100
                this.solve()
              // }
            }
          }
        }
      }
    } else {
      var rowSolutions = checkRow(this.board, position)
      if(rowSolutions.length == 1) {
        this.board[position[0]][position[1]] = rowSolutions[0]
        this.solve()
      } else {
        var columnSolutions = checkColumn(this.board, position, rowSolutions)
        if(columnSolutions.length == 1) {
          this.board[position[0]][position[1]] = columnSolutions[0]
          this.solve()
        } else {
          var boxSolutions = checkBox(this.board, position, columnSolutions)
          if(boxSolutions.length == 1) {
            this.board[position[0]][position[1]] = boxSolutions[0]
            this.solve()
          } else {
            // for(var i = 0; i < boxSolutions; i++) {
              this.board[position[0]][position[1]] = 10
              this.solve()
            // }
          }
        }
      }
    }
  },

  showBoard: function() {
    console.log(this.board)
  }
}



game = new Sudoku('005030081902850060600004050007402830349760005008300490150087002090000600026049503')
// game.showBoard()
game.solve()
