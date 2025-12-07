loop1: for (let i = 0; i < 3; i++) {
    loop2: for (let j = 0; j < 3; j++) {
        if (i === 1) {
            if (j === 1) {
                continue loop1;
            }
        }
        if (i === 2) {
            if (j === 2) {
                break loop2;
            }
        }
        console.log(i, j);
    }
}
