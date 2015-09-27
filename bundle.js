(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (a1, a2) {
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}

},{}],2:[function(require,module,exports){
$(function() {
  $('#testSubmit').click(function(e) {
    command = $('#testStringCommand').val()
    console.log(command)
  })
})

},{}],3:[function(require,module,exports){
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
  return position
}

var checkRow = function(board, position) {
  var row = board[position[0]]
  var solutions = []
  for(var num = 1; num < 10; num++) {
    var check = []
    for(var i = 0; i < 9; i++) {
      if (num != row[i]) {
        check.push(row[i])
      }
    }
    if (check.length == 9) {
      solutions.push(num)
    }
  }
  return solutions
}

var checkColumn = function(board, position, rowSolutions) {
  var column = []
  var check = []
  for(var i = 0; i < 9; i++) {
    column.push(board[i][position[1]])
  }
  for(var rowNum = 0; rowNum < rowSolutions.length; rowNum++) {
    for(var i = 0; i < 9; i++ ) {
      if(rowSolutions[rowNum] == column[i]) {
        check.push(column[i])
      }
    }
  }
  var columnSolutions = arr_diff(check, rowSolutions)
  return columnSolutions
}

var checkBox = function(board, position, columnSolutions) {
  var boxNum = findBox(position)
  var boxNumbers = getBox(boxNum, board)
  var check = []
  for(var colNum = 0; colNum < columnSolutions.length; colNum++) {
    for(var i = 0; i < 9; i++) {
      if(columnSolutions[colNum] == boxNumbers[i]) {
        check.push(boxNumbers[i])
      }
    }
  }
  var boxSolutions = arr_diff(check, columnSolutions)
  return boxSolutions
}

Sudoku = function(boardString) {
  this.boardString = boardString
  this.board = buildBoard(this.boardString)
  this.num = 0
}

Sudoku.prototype = {
  solve: function() {
    var position = definePosition(this.board, this.num)
    if(position.length == 0) {
      this.num += 10
      position = definePosition(this.board, this.num)
      if(position.length == 0) {
        this.showBoard()
      } else {
        this.solve()
      }
    } else {
      var rowSolutions = checkRow(this.board, position)
      if(rowSolutions.length == 1) {
        this.board[position[0]][position[1]] = rowSolutions[0].toString()
        this.solve()
      } else {
        var columnSolutions = checkColumn(this.board, position, rowSolutions)
        if(columnSolutions.length == 1) {
          this.board[position[0]][position[1]] = columnSolutions[0].toString()
          this.solve()
        } else {
          var boxSolutions = checkBox(this.board, position, columnSolutions)
          if(boxSolutions.length == 1) {
            this.board[position[0]][position[1]] = boxSolutions[0].toString()
            this.solve()
          } else {
            this.board[position[0]][position[1]] = this.num + 10
            this.solve()
          }
        }
      }
    }
  },
  showBoard: function() {
    console.log(this.board)
  }
}

// game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')

// game.solve()

},{"./array-diff.js":1}]},{},[1,2,3]);
