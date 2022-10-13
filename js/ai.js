class AIAlgorithm{
    //This class contains all of the arithmetic of the AI
    //Generates the score
    //Based on positions - A list of the locations of each square of the tetronimo
     scoreGenerator(sumOfHeights, numOfClears, numOfHoles, numOfBlockades){
        var score;
        
        var sumOfHeights;
        var numOfClears;
        var numOfHoles;
        var numOfBlockades;

        A = 1;
        B = 1;
        C = 1;
        D = 1; //these all need to change

        //A, B, C, and D are arbitrary multipliers (makes the algorithm more realistic)
        score = 
        A*sumOfHeights + 
        B*numOfClears + 
        C*numOfHoles + 
        D*numOfBlockades;
        
        return score;
    }

    //Generate a score for each possible move
    //Find sumOfHeights, numOfClears, numOfHoles, numOfBlockades

    heightsCalculator(){
        //needs to figure out the sum of the heights for a particular move
        for(i = 0; i < currentPosition[gameSizeWidth][1]; i++){
            //if(fieldArray[i][])
        }
        //the sum of heights is the total number of heights for a particular given move
        //loop through the fieldArray and find the number of blocks that are in a place for each column
        //count the number of blocks and turn that into a height score by having the bottom be 1, next row up be 2 etc
        //sum that all up and send it off as the sumOfHeights
        }
        
    clearsCalcualtor(){
            //needs to figure out if a clear is possible by checking if each row is close to full
            for(i = 0; i < gameSizeHeight; i++){//loop through cols
                for(j = 0; j < gameSizeWidth; j++){//loop through rows
                    let newArary = fieldArray.clone();//clone the fieldarray just in case
                    if(newArary[i][j] == 0){//check if the current position is empty
                        for(n = 0; n<gameSizeWidth/2; n++){//if so check if the positions to the right are empty
                            if(newArary[i+n][j]){
                                //then check if current shape would fit in the hole
                                if(currentPiece){//this is wrong
                                    numOfClears++;
                                }
                                //if so add one to the numofclears
                            }    
                            //then to the left
                            if(newArary[i-n][j]){
                                //then check if current shape would fit in the hole
                                if(currentPiece){//this is wrong - supposed to check if the current piece is a square basically
                                    numOfClears++;
                                }
                        }
                        
                    }
                }
            }
            }
            //if a row has more than 4 spaces open ignore it
            //if the current piece is longer than the number of open spots in a row ignore it 
            //if a row is blocked ignore it
            //check if a clear is possible, and the number of clears possible for the particular block
        }

    holesCalculator(){
        var numOfEmptySpots = 0;
            //checks the number of holes in the grid already by checking for an empty block and then if the block above it is there
        for(j=0; j> gameSizeWidth; j++){
            for(i = 0; i < currentPosition[1][gameSizeHeight]; i++){
                if(fieldArray[i][j] == 1){//if the i'th position in the row is full - need ot change gameSizeHeight -i to proper loop through each col
                    if(fieldArray[i][gameSizeHeight-i+1] == 1)//if the block above the same spot is 1 then add one to the number of holes
                    numOfHoles += 1;
                }
                }
        }
            //check each row for empty spots
            //if there is an empty spot check if the block above it is empty too
            //if so add one to the hole counter
        }

    blockadeCalculator(){
        //check for the current number of already present holes
        if(numOfHoles > 0){
        for(i = 0; i< gameSizeWidth; i++){
            for(j=0; j< gameSizeWidth; j++){
                if(fieldArray[i][j] == 0){ //if the spot is empty
                    if(fieldArray[i][j+1] == 1){ //if the spot above it is full
                        //that move would be considered a blockade
                    }
                }
            }
        }
        }
        //check if the current position is above a hole 
        //if so that move is bad
        //check for each hole if there is a block above the block above the hole
        //penalise for each 'blockade'
    }
    
    //Compare the scores against each other and decide the best move
    scoreComparator(score1, score2){
        if (score1>score2){
            return score1;
        }else{
            return score2;
        }
    }




}
    //Check for a tetris (could use a function to weight the positibility of a tetris)
    //Check if the move will disrupt the next potential move
    //Do the best move



