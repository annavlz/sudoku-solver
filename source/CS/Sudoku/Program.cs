using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            String board = new StreamReader("sample.unsolved.txt").ReadLine();

            Sudoku game = new Sudoku(board);

            // Remember: this will just fill out what it can and not "guess"
            game.Solve();

            Console.WriteLine(game.ToString());
            Console.WriteLine("Press any key to close");
            Console.ReadKey();

        }
    }
}
