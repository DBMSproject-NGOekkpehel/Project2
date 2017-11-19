function resolveAfterTwoSeconds(x) {
  return new Promise(resolve => {
    setTimeout(()=> {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfterTwoSeconds(10);
  console.log(x); // 10
}
f1();
