class Board
  WIN_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  attr_accessor :board

  def initialize
    @board = Array.new(9, " ")
  end

  def display
    puts
    puts " #{board[0]} | #{board[1]} | #{board[2]}"
    puts "-----------"
    puts " #{board[3]} | #{board[4]} | #{board[5]}"
    puts "-----------"
    puts " #{board[6]} | #{board[7]} | #{board[8]}"
    puts
  end

  def update_board(position, marker)
    board[position] = marker
  end

  def valid_move?(position)
    unless valid_range?(position + 1)
      puts "Invalid number / Not a number"
      return false
    end

    if position_taken?(position)
      puts "Position already taken!"
      return false
    end

    true
  end

  def valid_range?(position)
    (1..9).include?(position)
  end

  def position_taken?(position)
    board[position] == "X" || board[position] == "O"
  end

  def full?
    board.all? { |position| %w[X O].include?(position) }
  end

  def won?
    WIN_COMBINATIONS.each do |combination|
      if board[combination[0]] == "X" && board[combination[1]] == "X" && board[combination[2]] == "X"
        return "X"
      elsif board[combination[0]] == "O" && board[combination[1]] == "O" && board[combination[2]] == "O"
        return "O"
      end
    end
    false
  end

  def draw?
    full? && !won?
  end
end

class Game
  attr_accessor :board, :current_player

  def initialize
    @board = Board.new
    @current_player = "X"
  end

  def play
    until game_over?
      board.display
      position = input_to_position
      position = input_to_position until valid_move?(position)
      board.update_board(position, current_player)
      switch_players
    end

    board.display
    if board.won?
      puts "Player #{board.won?} wins!"
    else
      puts "It's a draw!"
    end
  end

  private

  def valid_move?(position)
    board.valid_move?(position)
  end

  def switch_players
    self.current_player = current_player == "X" ? "O" : "X"
  end

  def game_over?
    board.won? || board.draw?
  end

  def input_to_position
    puts "Insert number from 1 to 9"
    value = gets.chomp.to_i
    value - 1
  end
end

Game.new.play
