import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.length = 0;

        this.rows = 13;
        this.cols = 13;

        this.walls = [];
        this.max_walls_count = 50;
    }

    check_connectivity(g,a,b,x,y) {
        if(a===x && b===y) return true;
        g[a][b] = true;

        const dx = [1,-1,0,0], dy = [0,0,1,-1];

        for(let i=0;i<4;i++) {
            let xx = a+dx[i], yy = b+dy[i];

            if(!g[xx][yy] && this.check_connectivity(g,xx,yy,x,y)) return true;
        }

        return false;
    }

    create_Walls() {
        const g = [];

        for(let r = 0;r<this.rows;r++) {
            g[r] = [];
            for(let c = 0;c<this.cols;c++) {
                g[r][c] = false;
            }
        }
        
        for(let r = 0;r<this.rows;r++) {
            for(let c = 0;c<this.cols;c++) {
                if(r === 0 || c === 0 || r === this.rows-1 || c === this.cols-1) {
                    g[r][c] = true;
                }
            }
        }

        for(let i=0;i<this.max_walls_count/2;i++) {
            for(let j = 0;j<1000;j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);

                if(g[r][c]) continue;

                g[r][c] = true;
                g[c][r] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if(!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) 
            return false;

        for(let r = 0;r<this.rows;r++){
            for(let c=0;c<this.cols;c++) {
                if(g[r][c]) {
                    this.walls.push(new Wall(r,c,this));
                    console.log(r,c);
                }
            }
        }

        return true;
    }

    start() {
        for(let i=0;i<1000;i++) {
            if(this.create_Walls()) break;
        }

    }

    update_size() {
        this.length = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.length * this.cols;
        this.ctx.canvas.height = this.length * this.rows;
    }

    update() {
        this.update_size();
        this.render();

    }

    render() {
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_odd;
                } else {
                    this.ctx.fillStyle = color_even;
                }
                this.ctx.fillRect(c * this.length, r * this.length, this.length, this.length);
            }
        }
    }

}