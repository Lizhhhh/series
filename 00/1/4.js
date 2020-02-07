const s = new Set()
s.add(1)
  .add(2)
  .add(3)
  .add(2)

console.log(s)

const arr2 = [2, 3, 4, 4, 5, 7, 3, 3, 6, 3, 7, 7, 8, 3]
const arr = [...new Set(arr2)]
console.log(arr)

const m = new Map()
m.set('name', 'marron').set('age', 18)
for (let [key, value] of m) {
  console.log(key, value)
}
