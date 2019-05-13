var ticTacToeApp = angular.module('ticTacToeApp', []);


ticTacToeApp.controller('ticTacToeController', function ($scope) {
  $scope.board = [[{value: '-'}, {value: '-'}, {value: '-'}],[{value: '-'}, {value: '-'}, {value: '-'}],[{value: '-'}, {value: '-'}, {value: '-'}]];
  $scope.player = false;
  $scope.win = false;
  $scope.tie = false;
  $scope.message = ' ';
  $scope.resetClass = '';
  $scope.entryClass = [['','',''],['','',''],['','','']];

  $scope.reset = function() {
    for (let i = 0; i < $scope.board.length; i++) {
      for (let j = 0; j < $scope.board[i].length; j++) {
        $scope.board[i][j].value = '-';
      }
    }

    $scope.player = false;
    $scope.winner = null;
    $scope.tie = false;
    $scope.message = ' ';
    $scope.resetClass = '';
    $scope.entryClass = [['','',''],['','',''],['','','']];
  }

  $scope.showPlayer = function() {
    if($scope.message.length > 1) {
      return $scope.message;
    }else if($scope.player) {
      return "Current Player : 'X'";
    } else {
      return "Current Player : 'O'";;
    }
  }

  $scope.filled = function(entry,i,j) {
    if($scope.winner || $scope.tie) {
      $scope.entryClass[i][j] = '';
      return true;
    } else if (entry.value !== '-') {
      $scope.entryClass[i][j] = '';
      return true;
    } else {
      return false;
    }
  }

  $scope.checkWin = function() {
    var tie = true;
    for (let i = 0; i < $scope.board.length; i++) {
      for (let j = 0; j < $scope.board[i].length; j++) {
        if($scope.board[i][j].value === '-') {
          tie = false;
        }
        if (($scope.board[i][0].value === $scope.board[i][1].value) && ($scope.board[i][0].value === $scope.board[i][2].value && ($scope.board[i][0].value !== '-'))) {
          $scope.winner = $scope.board[i][0].value;
          return;
        }
        if (($scope.board[0][j].value === $scope.board[1][j].value) && ($scope.board[0][j].value === $scope.board[2][j].value && ($scope.board[0][j].value !== '-'))) {
          $scope.winner = $scope.board[0][j].value;
          return;
        }
      }
    }
    if (($scope.board[0][0].value === $scope.board[1][1].value) && ($scope.board[0][0].value === $scope.board[2][2].value && ($scope.board[0][0].value !== '-'))) {
      $scope.winner = $scope.board[0][0].value;
      return;
    }
    if (($scope.board[0][2].value === $scope.board[1][1].value) && ($scope.board[0][2].value === $scope.board[2][0].value && ($scope.board[0][2].value !== '-'))) {
      $scope.winner = $scope.board[0][2].value;
      return;
    }
    if (tie) {
      $scope.tie = true;
      return;
    }
  }

  $scope.makeTurn = function(i,j) {
    if($scope.board[i][j].value !== '-') {
      return;
    } else {
      if($scope.player) {
        $scope.board[i][j].value = 'X'; 
        $scope.player = !$scope.player;
      } else {
        $scope.board[i][j].value = 'O';
        $scope.player = !$scope.player;
      }
      $scope.checkWin();
      if ($scope.winner) {
        $scope.message = "Player " +  $scope.winner + " has won!";
        return;
      } else if ($scope.tie) {
        $scope.message = 'The game has reached a stalemate! Please reset.';
        return;
      }
    }
  }

  $scope.onEvent = function () {
    $scope.resetClass = 'highLight';
  }

  $scope.offEvent = function () {
    $scope.resetClass = '';
  }
  
  $scope.onEntryEvent = function(i,j) {
    $scope.entryClass[i][j] = 'highLight';
  }

  $scope.offEntryEvent = function(i,j) {
    $scope.entryClass[i][j] = '';
  }
});
