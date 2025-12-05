class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(dx, dy) {
        this.x = this.x + dx;
        this.y = this.y + dy;
    }
}

const p = new Point(1, 2);
p.move(3, 4);
console.log(p.x, p.y);
