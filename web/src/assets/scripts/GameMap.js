import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
import { Snake } from './Snake';

export class GameMap extends AcGameObject {
    constructor(ctx, parent, store) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.store = store;
        this.length = 0;

        this.rows = 13;
        this.cols = 14;

        this.walls = [];
        this.max_walls_count = 35;

        this.snakes = [
            new Snake({id: 0, color: "#4C78E7", r: this.rows - 2, c: 1},this),
            new Snake({id: 1, color: "#F33F4E", r: 1, c: this.cols - 2},this),
        ]
    }

    

    create_Walls() {
        const g = this.store.state.pk.gamemap;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    add_listening_events() {
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key === 's') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'i') snake1.set_direction(0);
            else if (e.key === 'l') snake1.set_direction(1);
            else if (e.key === 'k') snake1.set_direction(2);
            else if (e.key === 'j') snake1.set_direction(3);
        });
    }


    start() {
        this.create_Walls();

        this.add_listening_events();
    }

    check_ready() {
        for(const snake of this.snakes) {
            if(snake.status !== 'idle') return false;
            if(snake.direction === -1) return false;
        }

        return true;
    }

    next_step() {
        for(const snake of this.snakes) {
            snake.next_step();
        }
    }

    check_valid(cell) {
        for(const wall of this.walls) {
            if(wall.r === cell.r && wall.c === cell.c) { 
                return false;
            }
        }

        for(const snake of this.snakes) {
            let k  = snake.cells.length;
            if(!snake.check_tail_increasing()) {
                k--;
            }
            for(let i = 0;i<k;i++) {
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }

        return true;
    }

    update_size() {
        this.length = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.length * this.cols;
        this.ctx.canvas.height = this.length * this.rows;
    }

    update() {
        this.update_size();
        if(this.check_ready()) {
            this.next_step();
        }
        this.render();

    }

    render() {
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
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