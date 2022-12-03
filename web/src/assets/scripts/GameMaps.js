import { AcGameObject } from "./AcGamesObject";

export class GameMap extends AcGameObject {
    constructor(ctx,parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
    }
}