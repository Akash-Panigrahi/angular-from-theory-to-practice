// utils.ts
export default function square(x) {
  return Math.pow(x, 2);
}

export function cow() {
  console.log('Mooooo!!!');
}

function cat() {
  console.log('Meow!');
}

function dog() {
  console.log('Bark!');
}

export { cat as billi, dog };