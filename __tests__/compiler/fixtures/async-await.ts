async function fetchData() {
  return "data";
}

async function main() {
  const data = await fetchData();
  console.log(data);
}

main();
