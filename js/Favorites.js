//classe com a logica dos dados
//como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}

//classe visualização e eventos do html / extents = unir as duas classes
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
  }

  update() {
    const tbody = this.root.querySelector('table tbody')

    tbody.queSelectorAll('tr')
  }
}
