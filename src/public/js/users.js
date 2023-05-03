console.log('gaaaaaaa')

const api = async () => {
  try {
    const result = await fetch('http://localhost:3000/api/user')
    const datos = await result.json()
    console.log(datos)
  } catch (err) {
    console.log(err)
  }
}

api()

new gridjs.Grid({
  columns: ['Name', 'Lastname', 'email'],
  search: true,
  server: {
    url: 'http://localhost:3000/api/user',
    then: data => data.map(card => [card.name, card.lastname, card.email]),
    handle: (res) => {
      // no matching records found
      if (res.status === 404) return { data: [] }
      if (res.ok) return res.json()
      throw Error('oh no :(')
    }
  }
}).render(document.getElementById('wrapper'))
