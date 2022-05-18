let carrinho = []
const data = [
    {
      id: 1,
      img: "./img/jaqueta.svg",
      nameItem: "Lightweight Jacket",
      description:
        "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 2,
      img: "./img/gorro.svg",
      nameItem: "Black Hat",
      description:
        "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Acessórios"],
    },
    {
      id: 3,
      img: "./img/mascara.svg",
      nameItem: "Mask",
      description:
        "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
      value: 40,
      addCart: "Adicionar ao carrinho",
      tag: ["Acessórios"],
    },
    {
      id: 4,
      img: "./img/camiseta_preta.svg",
      nameItem: "T-Shirt",
      description:
        "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 5,
      img: "./img/camiseta_branca.svg",
      nameItem: "Short-Sleeve T-Shirt",
      description:
        "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 6,
      img: "./img/moletom.svg",
      nameItem: "Champion Packable Jacket",
      description:
        "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
  ];
  
const clothesList = []

function makeList(){
    const ul = document.querySelector('.clothes-list')
    for(let i = 0; i < data.length; i++){

        const card          = document.createElement('li')
        const figure        = document.createElement('figure')
        const image         = document.createElement('img')
        const figcaption    = document.createElement('figcaption')
        const section       = document.createElement('section')
        const category      = document.createElement('p')
        const title         = document.createElement('h3')
        const description   = document.createElement('p')
        const value         = document.createElement('p')
        const addToCart     = document.createElement('a')


        card.id                 = data[i].id
        image.src               = data[i].img
        image.alt               = data[i].nameItem
        figcaption.innerText    = data[i].nameItem
        category.innerText      = data[i].tag[0]
        title.innerText         = data[i].nameItem
        description.innerText   = data[i].description
        value.innerText         = "R$ " + data[i].value.toFixed(2)
        
        card.className          = "card"
        addToCart.innerText     = 'Adicionar ao carrinho'
        category.className         = 'category font-small-size'
        description.className   = value.className = addToCart.className = 'font-small-size'
        addToCart.href          = '#'
        addToCart.classList.add('link-cart')

        card.addEventListener('click', addToCartFunction)

        figure.appendChild(image)
        figure.appendChild(figcaption)
        section.appendChild(category)
        section.appendChild(title)
        section.appendChild(description)
        section.appendChild(value)
        section.appendChild(addToCart)

        card.appendChild(figure)
        card.appendChild(section)

        ul.appendChild(card)
        
        clothesList.push(card)
    }
}

function addToCartFunction(event){
    event.preventDefault()
    if(event.target.classList.contains('link-cart')){
        
        let elem = data.filter((d) => d.id == Number(event.currentTarget.id))[0]

        carrinho.push(elem)
        
        refreshCart()

    }
    
}

const boxAviso = document.getElementById('box-aviso')
const  sumBox = document.getElementById('sum-box')

function refreshCart(){
    
    const shoppingCartDiv = document.querySelector('.shopping-cart-inside')
    shoppingCartDiv.innerHTML = ""

    if(carrinho.length){
        
        boxAviso.classList.add('esconder')
        sumBox.classList.remove('esconder')

        let sum = 0, n = 0

        for(let i = 0; i < carrinho.length; i++){
            const section   = document.createElement('section')
            const figure    = document.createElement('figure')
            const img       = document.createElement('img')
            const div       = document.createElement('div')
            const h4        = document.createElement('h4')
            const p         = document.createElement('p')
            const a         = document.createElement('a')

            section.className = 'card-carrinho'
            a.href = '#'
            a.innerText = 'Remover produto'
            a.id = 'remove'

            section.id   = 'c' + carrinho[i].id
            img.src      = carrinho[i].img
            img.alt      = carrinho[i].nameItem
            h4.innerText = carrinho[i].nameItem
            p.innerText  = "R$ " + carrinho[i].value.toFixed(2)

            figure.appendChild(img)
            
            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(a)

            section.appendChild(figure)
            section.appendChild(div)

            shoppingCartDiv.appendChild(section)

            sum += carrinho[i].value
            n++

            section.addEventListener('click', (e) => {
                e.preventDefault()
                if(e.target.id == 'remove'){
                    carrinho = carrinho.filter((x) => x.id != Number(e.currentTarget.id[1]))
                    refreshCart()
                }
            })
        }

        document.getElementById('quantidade-total').innerText = n
        document.getElementById('valor-total').innerText = "R$ " + sum.toFixed(2)

    }else{
        boxAviso.classList.remove('esconder')
        sumBox.classList.add('esconder')
    }
}

makeList()