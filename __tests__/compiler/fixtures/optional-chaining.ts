const user = {
  profile: {
    name: 'alice',
    contact: { email: 'a@example.com' },
    greet() {
      return 'hi'
    },
  },
}

console.log(user?.profile?.name)
console.log(user?.profile?.greet?.())

const list = [{ value: 1 }, null, { nested: { deep: 3 } }]
console.log(list?.[1]?.value ?? 'missing')
console.log(list?.[2]?.nested?.deep ?? 0)
console.log(user?.missing?.prop)