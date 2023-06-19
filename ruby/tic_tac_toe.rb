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

def play(board)
  puts "Insert number from 1 to 9"
  index = gets.chomp
  index = value_to_index(index)
  return unless valid_move?(board, index)

  insert_marker(board, index)
end

def valid_move?(board, index)
  if valid_range?(index + 1) && !position_taken?(board, index - 1)
    true
  else
    puts "Invalid index"
  end
end

def valid_range?(index)
  (1..9).include?(index)
end

def position_taken?(board, index)
  board[index] == "X" || board[index] == "Y"
end

def value_to_index(value)
  value.to_i - 1
end

def insert_marker(board, index)
  board[index] = "X"
  display_board(board)
end

play(board)
