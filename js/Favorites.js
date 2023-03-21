//classe com a logica dos dados
//como os dados serão estruturados
import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.tbody = this.root.querySelector('table tbody')

    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    
  }

  save(){
    // tranforma um array em uma string em formato de json
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  //função assincrona, aguardar as promessas
  async add(username){
    //tentativa
    try {
      const userExist = this.entries.find(entry => entry.login === username)

      if(userExist){
        throw new Error('Usuário já cadastrado!')
      }
      const user = await GithubUser.search(username)

      if(user.login == undefined){
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error){
      alert(error.message)
    }


  }

  delete(user){
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

//classe visualização e eventos do html / extents = unir as duas classes
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.update()
    this.onAdd()
  }

  onAdd(){
    const addButton = this.root.querySelector('.search button')
    addButton.onclick= () => {
      //pegar o valor do input
      const {value} = this.root.querySelector('.search input')
      this.add(value)
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name} `
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = `/${user.login}`
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
          src=""
          alt=""
        />
        <a href="" target="_blank">
          <p></p>
          <span></span>
        </a>
      </td>
      <td class="repositories"></td>
      <td class="followers"></td>
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
