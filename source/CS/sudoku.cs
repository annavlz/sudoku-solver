public class Sudoku
{
  public Sudoku(string board)
  {}

  public void Solve()
  {}

  // Returns a string representing the current state of the board
  // Don't spend too much time on this method; flag someone from staff
  // if you are.
  public string Board
  {}
}

var board = new.StreamReader("sample.unsolved.txt").ReadLine();

var game = new Sudoku(board);

// Remember: this will just fill out what it can and not "guess"
game.Solve();

Console.WriteLine(game.Board);
