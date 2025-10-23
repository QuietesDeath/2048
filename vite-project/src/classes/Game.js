import Tile from "./Tile.js"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default class Game {

	constructor(){
		this.tileSize = 100
		this.tileCount = 4

		this.score = 0
		this.bestScore = 0
		
		this.tiles =[
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
		]
	}

	generateStyleSheet() {

	 }

	newGame() {
		this.tiles = [
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
		];
		this.score = 0;
		this.spawnTile();
		this.spawnTile();
	}

	spawnTile(x, y, v) {
		//let v = (Math.round(Math.random()) + 1) * 2
		if (!x || !y) {
			if (Math.random() > 0.75) {
				v = 4;
			} else {
				v = 2;
			}
			let emptyCoords = this.findEmptySpaces();
			let {x:newX, y:newY} = emptyCoords[getRandomInt(emptyCoords.length)];
			x = newX;
			y = newY;
		}
		this.tiles[y][x] = new Tile(v);
	}

	findEmptySpaces() {
		//
		let emptyCoords = [];
		for (let y = 0; y < this.tiles.length; y++) {
			for (let x = 0; x < this.tiles[y].length; x++) {
				if (!this.tiles[y][x]) emptyCoords.push({ x, y });
			}
		}
		return emptyCoords;
	}

	moveLeft() {
		for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                if (!this.tiles[y][x]) continue;
                for (let o = 0; o < x; o++) {
                    if (!this.tiles[y][o]) {
                        this.tiles[y][o] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                     }
                 }
             }
        }
	}

	moveRight() {
		for (let y = 0; y < this.tiles.length; y += 1) {
            for (let x = this.tiles[y].length - 1; x >= 0; x -= 1) {
                if (!this.tiles[y][x]) continue;
                for (let o = this.tiles[y].length - 1; o > x; o -= 1) {
                    if (!this.tiles[y][o]) {
                        this.tiles[y][o] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                    }
                }
            }
        }
	}

	moveUp() {
		for(let y = 0; y < this.tiles.length; y++) {
			for(let x = 0; x < this.tiles[y].length; x++){
				if(!this.tiles[y][x]) continue;
				for(let o = 0; 0 < y; o++) {
					if(!this.tiles[o][x]) {
						this.tiles[o][x] = this.tiles[y][x];
						this.tiles[y][x] = null
					}
				}
			}
		}
	}

	moveDown() {
		 for (let y = this.tiles.length - 1; y >= 0; y -= 1) {
            for (let x = this.tiles[y].length - 1; x >= 0; x -= 1) {
                 if (!this.tiles[y][x]) continue;
                for (let o = this.tiles.length - 1; o > y; o -= 1) {
                     if (!this.tiles[o][x]) {
                        this.tiles[o][x] = this.tiles[y][x];
                        this.tiles[y][x] = null;
                    }
                }
            }
        }
	}
}