async function main() {
  const asyncIterable = {
    [Symbol.asyncIterator]() {
      let i = 0;
      return {
        next() {
          if (i < 3) {
            return Promise.resolve({ value: i++, done: false });
          }
          return Promise.resolve({ done: true });
        }
      };
    }
  };

  for await (const num of asyncIterable) {
    console.log(num);
  }
}

main();
