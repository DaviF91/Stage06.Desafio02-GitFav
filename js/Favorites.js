//classe com a logica dos dados
//como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.tbody = this.root.querySelector('table tbody')

    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'DaviF91',
        name: 'Davi Ferreira',
        public_repos: '76',
        followers: '120000'
      },
      {
        login: 'maykbrito',
        name: 'Mayk Brito',
        public_repos: '5',
        followers: '10'
      }
    ]
  }

  delete(user){
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    
    this.entries = filteredEntries
  }
}

//classe visualização e eventos do html / extents = unir as duas classes
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name} `
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deleter esse usuário?')
        if(isOk){
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td class="user">
        <img
          src="https://github.com/DaviF91.png"
          alt="Foto de perfil do Davi"
        />
        <a href="https://github.com/DaviF91" target="_blank">
          <p>Davi Ferreira</p>
          <span>DaviF91</span>
        </a>
      </td>
      <td class="repositories">50</td>
      <td class="followers">100</td>
      <td>
        <button class="remove">Remover</button>
      </td>
    `

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
