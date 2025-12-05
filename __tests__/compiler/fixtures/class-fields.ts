class Point {
    x = 1;
    y = 2;
    static count = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        Point.count++;
    }
}

const p = new Point(10, 20);
console.log(p.x, p.y, Point.count);
