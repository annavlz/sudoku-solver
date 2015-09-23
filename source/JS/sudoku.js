var arr_diff = require('./array-diff.js')


Sudoku = function(boardString) {
  this.string = boardString
}

Sudoku.prototype = {
  board: [],
  solve: function() {
    var position = []
    for(var x = 0; x < 9; x++) {
      for(var y = 0; y < 9; y++) {
        if(this.board[x][y] == '0') {
          position = [x, y]
          break
        }
      }
      break
    }
    // console.log(position)
    var solution = {
      row: false,
      column: false,
      box: false
    }
    var rowSolutions = []
    var checkRow = function(board) {
      var row = board[position[0]]
      for(var num = 1; num < 10; num++) {
        var numString = num.toString()
        var check = []
        for(var i = 0; i < 9; i++) {

          if (numString !== row[i]) {
            check.push(row[i])
          }
        }
        if (check.length == 9) {
          rowSolutions.push(numString)
        }
      }

      // if(rowSolutions.length == 1) {solution[:row] = true}
    }
    var columnSolutions = []
    var checkColumn = function(board) {
      var column = []
      for(var i = 0; i < 9; i++) {
        column.push(board[i][position[1]])
      }
      console.log(column)
      var check = []
      for(var rowNum = 0; rowNum < rowSolutions.length; rowNum++) {
        for(var i = 0; i < 9; i++ ) {
          if(rowSolutions[rowNum] == column[i]) {
            check.push(column[i])
          }
        }
      }
      columnSolutions = arr_diff(check, rowSolutions)
    }
    checkRow(this.board)
    checkColumn(this.board)
    // return string
  },

  showBoard: function() {

    var numbers = this.string.split('')
    var z = 0
    for(var x = 0; x < 9; x++) {
      var row = []
      for(var y = 0; y < 9; y++) {
        row.push(numbers[z])
        z++
      }
      this.board.push(row)
    }
    // console.log(this.board)
  },

}



game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')
game.showBoard()
game.solve()

