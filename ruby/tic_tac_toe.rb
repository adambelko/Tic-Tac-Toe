win_combos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

def display_board(board)
  puts
  puts " #{board[0]} | #{board[1]} | #{board[2]}"
  puts "-----------"
  puts " #{board[3]} | #{board[4]} | #{board[5]}"
  puts "-----------"
  puts " #{board[6]} | #{board[7]} | #{board[8]}"
  puts
end

def get_board_index(board)
  puts "Insert number from 1 to 9"
  index = gets.chomp

  if input_number?(index)
    index = index.to_i
    if range_valid?(index)
      index -= 1
      insert_marker(board, index)
    else
      puts "Invalid number"
      puts "Insert number from 1 to 9"
    end
  else
    puts "Not a number"
    puts "Insert number from 1 to 9"
  end
end

def input_number?(value)
  value.to_i.to_s == value
end

def range_valid?(value)
  (1..9).include?(value)
end

def position_taken?(board, index)
  board[index] == " "
end

def insert_marker(board, index)
  board[index] = "X"
  display_board(board)
end

get_board_index(board)
