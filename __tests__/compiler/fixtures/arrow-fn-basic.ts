const total = ((a, b) => a + b)(1, 2);

const doubled = ((value) => value * 2)(total);

const combined = ((value) => ((extra) => value + extra)(4))(doubled);

void total;
void doubled;
void combined;
