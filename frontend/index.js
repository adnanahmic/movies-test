function foo(a) {
  function bar(b) {
    return a * b;
  }
}

const FOO = new foo(3);

FOO.bar(2);

const a = 3;

function foo(b) {
  return a * b;
}

foo();
