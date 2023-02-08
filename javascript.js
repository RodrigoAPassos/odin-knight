//position factory
const Position = (row = 0, col = 0, distFromInit = 0, parent = null) => {
    //based on knight moves and position generate an array of possible moves
    let possibleMoves = [];
    let moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];   //Knight moves
    for (let move of moves) {
        let newRow = row + move[0];
        let newCol = col + move[1];
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) possibleMoves.push([newRow, newCol]);
    }
    //return position, number of moves until this position, array of next possible moves and the parent of this position
    return {position: [row, col], distFromInit, possibleMoves, parent};
}
//
const knightMove = (rowStart = 0, colStart = 0, rowTarget, colTarget) => {
    //if entry coordinates out of board
    if (rowStart < 0 || rowStart > 7 || rowTarget < 0 || rowTarget > 7 || colStart < 0 || colStart > 7 || colTarget < 0 || colTarget > 7) 
    return "Please enter a valid coordinate (from 0,0 to 7,7)";

    let startPosition = Position(rowStart, colStart);
    let queue = [startPosition];    //BFS
    let visited = [];   //prevent infinite loop

    while (queue.length > 0) {
        let unqueued = queue.shift();
        //if found target
        if (unqueued.position[0] == rowTarget && unqueued.position[1] == colTarget) {
            visited.push(unqueued);
            console.log(`You made it in ${unqueued.distFromInit} moves!  Here's your path: `);
            //trace shortest path from target to start position
            let current = unqueued;
            let path = [current.position];
            while (current.parent != null) {
                current = current.parent;
                path.push(current.position);
            }
            return path.reverse().forEach((move) => console.log(`[${move}]`));
        }else { 
            visited.push(unqueued);
            //get possible moves and enqueue if not visited
            for (let nextMove of unqueued.possibleMoves) {
                let nextKnightMove = Position(nextMove[0], nextMove[1], unqueued.distFromInit + 1, unqueued);
                if (visited.includes(nextKnightMove)) continue;
                else queue.push(nextKnightMove);
            }
        }
    }
}