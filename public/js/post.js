document.getElementById('userName').innerHTML = sessionStorage.NOME_USUARIO

let subgenres = []
let images = []

function selectSubGenre() {
  let subG = selSubGenre.value
  let inptSubG = inptOtherSubGenre
  inptSubG.style.display = 'none'

  if (subG == '99') { inptSubG.style.display = 'flex' }
  else if (subG != '#' && !subgenres.includes(subG)) { subgenres.push(subG) }
  else { subgenres.splice(subgenres.indexOf(subG), 1) }

  let msg = ``

  for (let i = 0; i < subgenres.length; i++) { msg += `${subgenres[i]}<br>` }

  divSubGenreSelected.innerHTML = msg
}

function selectAge() {
  let age = selAge.value
  let inptAge = inptOtherAge

  if (age == '99') { inptAge.style.display = 'flex' }
  else { inptAge.style.display = 'none' }
}

function selectLocation() {
  let age = selLocation.value
  let inptLocation = inptOtherLocation

  if (age == '99') { inptLocation.style.display = 'flex' }
  else { inptLocation.style.display = 'none' }
}

function selectCountry() {
  let country = selCountry.value
  let inptCountry = inptOtherCountry

  if (country == '99') { inptCountry.style.display = 'flex' }
  else { inptCountry.style.display = 'none' }
}

function uploadImage() {
  let divImages = divImagesUploaded
}

function post() {
  let title = inptTitle.value
  let tale = inptTale.value
  let otherSubG = inptOtherSubGenre.value
  let age = selAge.value
  let otherAge = inptOtherAge.value
  let loc = selLocation.value
  let otherLoc = inptOtherLocation.value
  let country = selCountry.value
  let otherCountry = inptOtherCountry.value

  let idUser = sessionStorage.ID_USUARIO

  let msg = ``

  if (title == ``) { msg += `Preencha o titulo da história <br>` }
  if (tale == ``) { msg += `Digite uma história <br>` }

  console.log('A mensagem ' + msg)

  if (msg == ``) {
    let subgenreBody

    if (subgenres > 0) { subgenreBody = subgenres }
    else if (otherSubG) { subgenreBody = otherSubG }
    else { subgenreBody = null }

    let ageBody = age == '#' ? (otherAge == '' ? null : otherAge) : age
    let locBody = loc == '#' ? (otherLoc == '' ? null : otherLoc) : loc
    let countryBody = country == '#' ? (otherCountry == '' ? null : otherCountry) : country

    fetch(`/posts/uploadPost/${idUser}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        tale: tale,
        subgenre: subgenreBody,
        age: ageBody,
        loc: locBody,
        country: countryBody
      })
    }).then(function (resposta) {
      console.log("Resposta: ", resposta)

      if (resposta.ok) {
        window.alert("Post realizado com sucesso");
      } else {
        throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    })
  }

  divMsg.innerHTML = msg
}