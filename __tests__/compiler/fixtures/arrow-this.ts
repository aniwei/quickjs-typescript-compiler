function Foo() {
    this.x = 1;
    const arrow = () => {
        this.y = 2;
    };
    arrow();
}
