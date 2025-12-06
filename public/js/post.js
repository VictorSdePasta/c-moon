document.getElementById('userName').innerHTML = sessionStorage.NOME_USUARIO
let idUser = sessionStorage.ID_USUARIO

let subgenresTitle = []
let subgenres = []
let images = []

function selectSubGenre() {
  let subG = selSubGenre.value
  let subGTitle = selSubGenre.options[selSubGenre.selectedIndex].text
  let inptSubG = inptOtherSubGenre
  inptSubG.style.display = 'none'

  if (subG == '0') { inptSubG.style.display = 'flex' }
  else if (subG != '#' && !subgenres.includes(subG)) {
    subgenres.push(subG)
    subgenresTitle.push(subGTitle)
  }
  else {
    let i = subgenres.indexOf(subG)
    subgenres.splice(i, 1)
    subgenresTitle.splice(i, 1)
  }

  let msg = ``

  for (let i = 0; i < subgenres.length; i++) { msg += `${subgenresTitle[i]}<br>` }

  divSubGenreSelected.innerHTML = msg
}

function selectAge() {
  let age = selAge.value
  let inptAge = inptOtherAge

  if (age == '0') { inptAge.style.display = 'flex' }
  else { inptAge.style.display = 'none' }
}

function selectLocation() {
  let age = selLocation.value
  let inptLocation = inptOtherLocation

  if (age == '0') { inptLocation.style.display = 'flex' }
  else { inptLocation.style.display = 'none' }
}

function selectCountry() {
  let country = selCountry.value
  let inptCountry = inptOtherCountry

  if (country == '0') { inptCountry.style.display = 'flex' }
  else { inptCountry.style.display = 'none' }
}

// function uploadImage() {
//   let divImages = divImagesUploaded
// }

function post() {
  let title = inptTitle.value
  let tale = inptTale.value

  let msg = ``

  if (title == ``) { msg += `Preencha o titulo da história <br>` }
  if (tale == ``) { msg += `Digite uma história <br>` }

  if (msg == ``) {
    fetch(`/posts/uploadPost/${idUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        tale: tale
      })
    }).then(function (resposta) {
      console.log("Resposta: ", resposta)

      if (resposta.ok) {
        lastPost()
      } else {
        msg += `Houve um erro ao tentar realizar a postagem! Tente novamente mais tarde.`
        throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    })
  }

  divMsg.innerHTML = msg
}

function lastPost() {

  let otherSubG = inptOtherSubGenre.value
  let age = selAge.value
  let otherAge = inptOtherAge.value
  let loc = selLocation.value
  let otherLoc = inptOtherLocation.value
  let country = selCountry.value
  let otherCountry = inptOtherCountry.value

  fetch(`/posts/lastPost/${idUser}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(resp => {
          console.log("Dados recebidos: ", JSON.stringify(resp))

          let idPost = resp.id

          // if (postImage.files.length > 0) {
          //   uploadImage()
          //     .then(id => connectTables('imagem_post', idPost, id, 'imagem'))
          // }


          if (otherSubG != ``) {
            uploadOther('subgenero', otherSubG)
              .then(id => connectTables('subgenero_post', idPost, id, 'subgenero'))
          }

          subgenres.forEach(subgen => {
            connectTables('subgenero_post', idPost, subgen, 'subgenero');
          })

          if (age == '0') {
            uploadOther('epoca', otherAge)
              .then(id => { connectTables('epoca_post', idPost, id, 'epoca') })
          } else if (age != '#') { connectTables('epoca_post', idPost, age, 'epoca') }

          if (loc == '0') {
            uploadOther('local_narrativo', otherLoc)
              .then(id => { connectTables('local_narrativo_post', idPost, id, 'local_narrativo') })
          } else if (loc != '#') { connectTables('local_narrativo_post', idPost, loc, 'local_narrativo') }

          if (country == '0') {
            uploadOther('pais', otherCountry)
              .then(id => { connectTables('pais_post', idPost, id, 'pais') })
          } else if (country != '#') { connectTables('pais_post', idPost, country, 'pais') }


          divMsg.innerHTML = "Post realizado com sucesso"
        })
      }
    })
}

function connectTables(table, idPost, idTable, connectTable) {
  fetch(`/posts/connect/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      postId: idPost,
      tableId: idTable,
      conTable: connectTable
    })
  }).then(function (resposta) {
    console.log("resposta: ", resposta);

    if (resposta.ok) {
      console.log(`Conexão de tabelas realizada!`)
    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  })
}

function uploadOther(table, title) {
  return fetch(`/posts/upload/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO uploadOther()!")

    if (resposta.ok) {
      console.log(resposta)

      return resposta.json()
    } else {
      console.log("Houve um erro ao cadastrar novo elemento");
      return ``
    }
  }).then(json => {
    console.log("Dados recebidos: ", JSON.stringify(json))
    return json.idResult
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
    return ``
  })
}

let selSub = document.getElementById('selSubGenre')
let selA = document.getElementById('selAge')
let selLoc = document.getElementById('selLocation')
let selCoun = document.getElementById('selCountry')

let selectsToFill = [selSub, selA, selLoc, selCoun]
let selectsType = ['subgenero', 'epoca', 'local_narrativo', 'pais']

for (let i = 0; i < selectsToFill.length; i++) {
  fetch(`/posts/fillSelect/${selectsType[i]}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta))

          for (let j = 0; j < resposta.length; j++) {
            let dados = resposta[j]

            const opt = document.createElement('option')
            opt.value = dados.id
            opt.textContent = dados.title
            selectsToFill[i].appendChild(opt)
          }

          const opt = document.createElement('option')
          opt.value = '0'
          opt.textContent = 'Outro'
          selectsToFill[i].appendChild(opt)
        })
      } else {
        const opt = document.createElement('option')
        opt.value = '0'
        opt.textContent = 'Outro'
        selectsToFill[i].appendChild(opt)
      }

    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    })
};

function upload(idPost) {
  const formData = new FormData();
  formData.append('postImage', postImage.files[0])

  fetch(`/posts/uploadImage/${idPost}`, {
    method: "POST",
    body: formData
  })
    .catch(err => {
      console.log(err);
    })
}