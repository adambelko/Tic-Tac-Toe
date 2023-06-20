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

def input_to_index
  puts "Insert number from 1 to 9"
  value = gets.chomp
  value_to_index(value)
end

def play(board)
  counter = 1

  while counter <= 9
    index = input_to_index
    index = input_to_index until valid_move?(board, index)

    if counter.odd?
      insert_marker("X", board, index)
    else
      insert_marker("O", board, index)
    end

    counter += 1
  end
end

def valid_move?(board, index)
  unless valid_range?(index + 1)
    puts "Invalid number / Not a number"
    return false
  end

  if position_taken?(board, index)
    puts "Position already taken!"
    return false
  end

  true
end

def valid_range?(index)
  (1..9).include?(index)
end

def position_taken?(board, index)
  board[index] == "X" || board[index] == "O"
end

def value_to_index(value)
  value.to_i - 1
end

def insert_marker(player, board, index)
  p board
  board[index] = player
  display_board(board)
end

play(board)
