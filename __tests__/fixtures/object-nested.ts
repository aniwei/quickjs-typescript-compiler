const data = {
  users: [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ],
  meta: {
    page: 1,
    total: 100
  }
};
console.log(data.users[0].name);
console.log(data.meta.total);
