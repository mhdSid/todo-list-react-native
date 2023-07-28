function * iterator () {
  let index = 1
  while (true) { yield index++ }
}

const generator = iterator()

const generate = () => `${generator.next().value}`

export default generate
