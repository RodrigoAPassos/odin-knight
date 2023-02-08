/* const board = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7],
    [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
    [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7],
    [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7]
] */

const Position = (row = 0, col = 0, distFromInit = 0) => {
    
    let possibleMoves = [];
    let moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
    
    for (let move of moves) {
        let newRow = row + move[0];
        let newCol = col + move[1];
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) possibleMoves.push([newRow, newCol]);
    }
    
    return {position: [row, col], distFromInit, possibleMoves};
}

const knightMove = (rowTarget = 0, colTarget = 0) => {
    let startPosition = Position();

    let queue = [startPosition];
    let visited = [];
    let target = [rowTarget, colTarget];

    while (queue.length > 0) {
        
        let unqueued = queue.shift();
        if (unqueued.position[0] == rowTarget && unqueued.position[1] == colTarget) {
            visited.push(unqueued.position);
            console.log(`You made it in ${unqueued.distFromInit} moves!  Here's your path: `);
            return visited.forEach((visit) => console.log(`--> [${visit}]`));
        }else { 
            visited.push(unqueued.position);
            //console.log(visited);
            
            for (let nextMove of unqueued.possibleMoves) {
                
                if (nextMove[0] == rowTarget && nextMove[1] == colTarget) {
                    let nextKnightMove = Position(nextMove[0], nextMove[1], unqueued.distFromInit + 1);
                    queue.push(nextKnightMove);
                    console.log(nextKnightMove.position + " é esse!");
                    break;
                }//else if (visited.includes(nextKnightMove.position)) continue;
                else {
                    continue
                }
            }
            
        }
    }
}