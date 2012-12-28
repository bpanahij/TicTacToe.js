var TicTacToe;
var Gameboard = function(initialGameboard){
    var defaultGameboard = ["_","_","_","_","_","_","_","_","_"];
    var winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    var currentGameboard = initialGameboard || defaultGameboard;
    var pastMoves = [];
    var winner = null;
    this.print = function(){
        var str = '';
        for (var i in currentGameboard)
        {
            str += currentGameboard[i];
            if (i%3 == 2){
               str += "\n";
            }
        }
        console.log(str);
                        
    }

    this.getCurrentGameboard = function(){
        return currentGameboard;
    }
        
    this.markPos = function(marker, pos){
        if(marker !== 'X' && marker!== 'O'){throw("marker incorrect");}
        if(pos>8 || pos<0){throw("position must be from 0 to 8");}        
        currentGameboard[pos] = marker;
        pastMoves.push(pos);
        checkIfWinner();
    }

    this.revertMove = function(){
        if(pastMoves.length == 0) throw("no more past moves");
        currentGameboard[pastMoves.pop()] = "_";
        winner = null;
    }
    this.isGameover = function(){
        if (winner == null){
            return false;
        }else{
            return true;
        }
    }

    this.getWinner = function(){
        return winner;
    }

    var checkIfWinner = function(){
        for(var i in winCombinations){
            if (isWinCondition(winCombinations[i])){
                winner = currentGameboard[winCombinations[i][0]];
                return winner;
            }
        }
        if (pastMoves.length === 9){
            winner = '_';
            return winner;
        }
        return null;
    }

    var isWinCondition = function(winCombination){
        return currentGameboard[winCombination[0]] === currentGameboard[winCombination[1]]
            && currentGameboard[winCombination[0]] === currentGameboard[winCombination[2]] 
            && currentGameboard[winCombination[0]] !== '_';
    }

    this.getEmptyPos = function(){
        var empty = [];
        for (var i in currentGameboard){
            if(currentGameboard[i]==='_')
                empty.push(i);
        }
        return empty;
    }
};

var playerAI = function(marker){
    this.marker = marker;
    this.opponentMarker = invertMarker(marker);
    var invertMarker = function(marker){
        if( marker === 'O')
            return 'X'
        return 'O'
    }
};