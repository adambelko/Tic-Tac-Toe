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
  turn(board) until game_over?(board)

  winner = won?(board)
  if winner
    puts "Player #{winner} wins!"
  else
    puts "It's a draw!"
  end
end

def turn(board)
  counter = 1

  until game_over?(board)
    index = input_to_index
    index = input_to_index until valid_move?(board, index)

    if counter.odd?
      insert_marker("X", board, index)
    else
      insert_marker("O", board, index)
    end
    display_board(board)
    counter += 1
  end
end

def game_over?(board)
  won?(board) || draw?(board)
end

def won?(board)
  win_combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  win_combinations.each do |combination|
    if board[combination[0]] == "X" && board[combination[1]] == "X" && board[combination[2]] == "X"
      return "X"
    elsif board[combination[0]] == "O" && board[combination[1]] == "O" && board[combination[2]] == "O"
      return "O"
    end
  end
  false
end

def full?(board)
  board.all? { |position| %w[X O].include?(position) }
end

def draw?(board)
  full?(board) && !won?(board)
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

def input_to_index
  puts "Insert number from 1 to 9"
  value = gets.chomp
  value_to_index(value)
end

def value_to_index(value)
  value.to_i - 1
end

def valid_range?(index)
  (1..9).include?(index)
end

def position_taken?(board, index)
  board[index] == "X" || board[index] == "O"
end

def insert_marker(player, board, index)
  board[index] = player
end

play(board)
