export function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  console.log(`seededRandom: seed=${seed}, x=${x}, result=${x - Math.floor(x)}`);
  return x - Math.floor(x);
}

export function getRandomInt(seed, min, max) {
  const random = seededRandom(seed);
  min = Math.ceil(min);
  max = Math.floor(max);
    const result = Math.floor(random * (max - min + 1)) + min;
  console.log(`getRandomInt: seed=${seed}, min=${min}, max=${max}, random=${random}, result=${result}`);
  return result;
}
