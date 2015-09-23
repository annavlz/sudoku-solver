var arr_diff = require('./array-diff.js')


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

var definePosition = function(board) {
  var position = []
    for(var x = 0; x < 9; x++) {
      for(var y = 0; y < 9; y++) {
        if(board[x][y] == '0') {
          position = [x, y]
          break
        }
      }
      break
    }
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
  console.log(columnSolutions);
}

Sudoku = function(boardString) {
  this.boardString = boardString
  this.board = buildBoard(this.boardString)
}

Sudoku.prototype = {
  solve: function() {
    var position = definePosition(this.board)
    var rowSolutions = checkRow(this.board, position)
    var columnSolutions = checkColumn(this.board, position, rowSolutions)

  },

  showBoard: function() {
    // console.log(this.board)
  }
}



game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')
game.showBoard()
game.solve()
