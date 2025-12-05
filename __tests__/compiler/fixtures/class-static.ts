class MathUtil {
    static PI = 3.14159;
    
    static square(x: number) {
        return x * x;
    }
    
    static area(r: number) {
        return MathUtil.PI * MathUtil.square(r);
    }
}

console.log(MathUtil.PI);
console.log(MathUtil.square(5));
console.log(MathUtil.area(2));
