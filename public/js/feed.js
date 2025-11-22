let selFeedCoun = document.getElementById('selFeedCountry')

fetch(`/posts/fillSelect/pais`)
  .then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta))

        for (let j = 0; j < resposta.length; j++) {
          let dados = resposta[j]

          const opt = document.createElement('option')
          opt.value = dados.id
          opt.textContent = dados.title

          if (j == 0) { opt.selected = true }

          selFeedCoun.appendChild(opt)
        }
      })

      feed(resposta[0].id)
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  })

function feed(idPais) {
  fetch(`/feedContent/fill/${idPais}`).then(function (resposta) {
    if (resposta.ok) {
      if (resposta.status == 204) {
        var feed = document.getElementById("posts");
        var mensagem = document.createElement("span");
        mensagem.innerHTML = "Nenhum resultado encontrado."
        feed.appendChild(mensagem);
        throw "Nenhum resultado encontrado!!";
      }

      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));

        var feed = document.getElementById("posts");
        let msg = ``
        feed.innerHTML = "";
        for (let i = 0; i < resposta.length; i++) {
          var publicacao = resposta[i];

          let subgenres = ``
          let pubSubg = publicacao.subG
          for (let j = 0; j < pubSubg.length; j++) {
            subgenres += `#${pubSubg[j]} `
          }

          let pubAge = ``
          if (publicacao.postAge != '') { pubAge = `#${publicacao.postAge} ` }

          let pubCountry = ``
          if (publicacao.postCountry != '') { pubCountry = `#${publicacao.postCountry} ` }

          let pubLocation = ``
          if (publicacao.postLocation != '') { pubLocation = `#${publicacao.postLocation} ` }

          msg +=
            `<div class="postSection">
            <div class="post">
              <div class="header">
                <div class="user">
                  <div class="publicacao"></div>
                  <h3 id="h3PostUserName">${publicacao.userName}</h3>
                </div>
                <div class="legends">${subgenres}${pubAge}${pubCountry}${pubLocation}</div>
              </div>
              <div class="postImages"></div>
              <div class="description">
                <h3 id="h3HistTitle">Titulo</h3>
                <div class="sinopse">
                  <span id="spanSinopseHist">História: lorem impsum</span>
                  <div class="buttons">
                    <button class="like" onclick="like()"><svg xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 42.532 42.532"
                        xml:space="preserve">
                        <g>
                          <path
                            d="M41.856,15.918c-4.914,0-9.828,0-14.744,0c-0.159,0-0.318,0-0.478,0   c-1.464-4.502-2.926-9.006-4.389-13.509c-0.091-0.279-0.182-0.56-0.273-0.84c-0.018-0.23-0.165-0.396-0.358-0.492   c-0.03-0.016-0.059-0.03-0.091-0.042c-0.041-0.014-0.082-0.022-0.125-0.03c-0.045-0.008-0.087-0.015-0.132-0.014   c-0.045,0-0.088,0.006-0.132,0.014c-0.043,0.007-0.084,0.016-0.125,0.03c-0.032,0.011-0.061,0.025-0.09,0.042   c-0.193,0.096-0.341,0.262-0.359,0.492c-1.508,4.641-3.016,9.284-4.524,13.925c-0.046,0.141-0.092,0.283-0.138,0.424   c-4.746,0-9.49,0-14.236,0c-0.329,0-0.657,0-0.986,0c-0.746,0-0.89,0.915-0.354,1.305C4.298,20.112,8.274,23,12.25,25.889   c0.11,0.08,0.22,0.16,0.331,0.24c-1.47,4.525-2.94,9.049-4.411,13.572c-0.102,0.312-0.203,0.625-0.305,0.938   c-0.181,0.556,0.526,1.155,1.028,0.791c3.976-2.889,7.952-5.776,11.929-8.666c0.148-0.107,0.296-0.215,0.445-0.323   c3.858,2.804,7.716,5.606,11.575,8.409c0.267,0.193,0.532,0.388,0.798,0.58c0.502,0.364,1.209-0.235,1.028-0.791   c-1.519-4.674-3.037-9.348-4.558-14.021c-0.052-0.162-0.105-0.324-0.158-0.486c3.82-2.776,7.64-5.551,11.461-8.328   c0.266-0.193,0.531-0.386,0.798-0.58C42.746,16.833,42.604,15.918,41.856,15.918z M39.706,17.318   c-3.376,2.454-6.753,4.907-10.132,7.361c-0.025,0.019-0.052,0.038-0.077,0.057c-0.804-2.473-1.607-4.945-2.411-7.418   C31.293,17.318,35.5,17.318,39.706,17.318z M13.768,26.994c2.104,1.528,4.208,3.057,6.311,4.586   c-3.404,2.473-6.808,4.944-10.212,7.418C11.167,34.996,12.468,30.995,13.768,26.994z M21.265,30.718   c-2.349-1.706-4.697-3.412-7.044-5.118c0.898-2.761,1.794-5.521,2.692-8.281c2.901,0,5.802,0,8.704,0   c0.898,2.76,1.795,5.52,2.692,8.281C25.961,27.305,23.613,29.012,21.265,30.718z M25.147,15.866   c0.006,0.017,0.012,0.035,0.017,0.052c-2.598,0-5.196,0-7.795,0c1.298-3.999,2.598-7.998,3.897-11.996   C22.559,7.903,23.853,11.885,25.147,15.866z M2.824,17.318c4.198,0,8.396,0,12.595,0c0.007,0,0.015,0,0.022,0   c-0.804,2.472-1.607,4.944-2.41,7.416C9.628,22.262,6.226,19.79,2.824,17.318z M32.663,38.999   c-3.404-2.475-6.808-4.947-10.213-7.421c2.104-1.528,4.207-3.057,6.312-4.586C30.063,30.994,31.362,34.997,32.663,38.999z" />
                        </g>
                      </svg></button>
                    <div id="divLikes">50</div>
                    <button class="comment" onclick="comment()"><svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="none">
                        <path d="M8 10.5H16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 14H13.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                        <path
                          d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
                          stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                      </svg></button>
                    <div id="divComments">50</div>
                    <button onclick="seeMore()" class="seeMore">Ver Rumor</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="highlightedComment">
              <div class="user">
                <div class="profile"></div>
                <h3 id="h3PostCommentUserName">Usuário</h3>
              </div>
              <div class="description">
                <span id="spanCommentUser">Comentário: lorem impsum</span>
                <div class="buttons">
                  <button class="like" onclick="like()"><svg xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 42.532 42.532"
                      xml:space="preserve">
                      <g>
                        <path
                          d="M41.856,15.918c-4.914,0-9.828,0-14.744,0c-0.159,0-0.318,0-0.478,0   c-1.464-4.502-2.926-9.006-4.389-13.509c-0.091-0.279-0.182-0.56-0.273-0.84c-0.018-0.23-0.165-0.396-0.358-0.492   c-0.03-0.016-0.059-0.03-0.091-0.042c-0.041-0.014-0.082-0.022-0.125-0.03c-0.045-0.008-0.087-0.015-0.132-0.014   c-0.045,0-0.088,0.006-0.132,0.014c-0.043,0.007-0.084,0.016-0.125,0.03c-0.032,0.011-0.061,0.025-0.09,0.042   c-0.193,0.096-0.341,0.262-0.359,0.492c-1.508,4.641-3.016,9.284-4.524,13.925c-0.046,0.141-0.092,0.283-0.138,0.424   c-4.746,0-9.49,0-14.236,0c-0.329,0-0.657,0-0.986,0c-0.746,0-0.89,0.915-0.354,1.305C4.298,20.112,8.274,23,12.25,25.889   c0.11,0.08,0.22,0.16,0.331,0.24c-1.47,4.525-2.94,9.049-4.411,13.572c-0.102,0.312-0.203,0.625-0.305,0.938   c-0.181,0.556,0.526,1.155,1.028,0.791c3.976-2.889,7.952-5.776,11.929-8.666c0.148-0.107,0.296-0.215,0.445-0.323   c3.858,2.804,7.716,5.606,11.575,8.409c0.267,0.193,0.532,0.388,0.798,0.58c0.502,0.364,1.209-0.235,1.028-0.791   c-1.519-4.674-3.037-9.348-4.558-14.021c-0.052-0.162-0.105-0.324-0.158-0.486c3.82-2.776,7.64-5.551,11.461-8.328   c0.266-0.193,0.531-0.386,0.798-0.58C42.746,16.833,42.604,15.918,41.856,15.918z M39.706,17.318   c-3.376,2.454-6.753,4.907-10.132,7.361c-0.025,0.019-0.052,0.038-0.077,0.057c-0.804-2.473-1.607-4.945-2.411-7.418   C31.293,17.318,35.5,17.318,39.706,17.318z M13.768,26.994c2.104,1.528,4.208,3.057,6.311,4.586   c-3.404,2.473-6.808,4.944-10.212,7.418C11.167,34.996,12.468,30.995,13.768,26.994z M21.265,30.718   c-2.349-1.706-4.697-3.412-7.044-5.118c0.898-2.761,1.794-5.521,2.692-8.281c2.901,0,5.802,0,8.704,0   c0.898,2.76,1.795,5.52,2.692,8.281C25.961,27.305,23.613,29.012,21.265,30.718z M25.147,15.866   c0.006,0.017,0.012,0.035,0.017,0.052c-2.598,0-5.196,0-7.795,0c1.298-3.999,2.598-7.998,3.897-11.996   C22.559,7.903,23.853,11.885,25.147,15.866z M2.824,17.318c4.198,0,8.396,0,12.595,0c0.007,0,0.015,0,0.022,0   c-0.804,2.472-1.607,4.944-2.41,7.416C9.628,22.262,6.226,19.79,2.824,17.318z M32.663,38.999   c-3.404-2.475-6.808-4.947-10.213-7.421c2.104-1.528,4.207-3.057,6.312-4.586C30.063,30.994,31.362,34.997,32.663,38.999z" />
                      </g>
                    </svg></button>
                  <div id="divLikes">50</div>
                  <button class="reply" onclick="reply()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      fill="none">
                      <path d="M12 4.5L7 9.5M12 4.5L17 9.5M12 4.5L12 11M12 14.5C12 16.1667 13 19.5 17 19.5"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
                </div>
              </div>
            </div>
          </div>
        </div>`
        }

        finalizarAguardar();
      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);
    finalizarAguardar();
  });
}