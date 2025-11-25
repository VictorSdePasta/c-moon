let proximaAtualizacao

window.onload = obterDadosGraficoBarra('0'), obterDadosGraficoPie()

function alterarTitulo(Pais) {
  let tituloRegiao = document.getElementById(`tituloRegiao}`)
  tituloRegiao.innerHTML = "Top 5 regiões com mais rumores em " + Pais
}

function obterDadosGraficoBarra(idPais) {
  if (idPais != '0') {
    let pais = document.getElementById(`selRegiao`)
    let paisVal = pais.options[pais.selectedIndex].text
    alterarTitulo(paisVal)
  }

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/dash/barData${idPais == 0 ? `` : `/${idPais}`}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        
        plotarGraficoPie(resposta, idPais);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function obterDadosGraficoPie(idPais) {
  if (idPais != '0') {
    let pais = document.getElementById(`selRegiao`)
    let paisVal = pais.options[pais.selectedIndex].text //
    alterarTitulo(paisVal)
  }

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/dash/pieData${idPais == 0 ? `` : `/${idPais}`}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        
        plotarGraficoPie(resposta, idPais);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoBarra(resposta) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels1 = [];

  // Criando estrutura para plotar gráfico - dados
  let dados1 = {
    labels: labels1,
    datasets: [{
      data: [],
      backgroundColor: '#A63F03'
    }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i]
    labels1.push(registro.locations)
    dados1.datasets[0].data.push(registro.likes)
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels1)
  console.log('Dados:')
  console.log(dados1.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config1 = {
    type: 'bar',
    data: dados1,
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          ticks: {
            color: 'white',
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          grid: {
            color: 'white'
          },
          title: {
            display: true,
            text: 'Quantidade de rumores',
            color: 'white',
            font: {
              size: 18,
              weight: 'bold'
            }
          }
        },
        y: {
          ticks: {
            color: 'white',
            font: {
              size: 22,
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: '',
            color: 'white',
            font: {
              size: 22,
              weight: 'bold'
            }
          },
          beginAtZero: true
        }
      }
    }
  };

  // Adicionando gráfico criado em div na tela
  let myChart1 = new Chart(
    document.getElementById(`grafTop5`),
    config1
  )

  setTimeout(() => atualizarGrafico(idPais, dados1, myChart1), 2000);
}

function plotarGraficoPie(resposta) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels1 = [];

  // Criando estrutura para plotar gráfico - dados
  let dados1 = {
    data: pieSubgData,
    backgroundColor: [
      "#D1120D",
      "#B5383E",
      "#EF6420",
      "#EB5338",
      "#BE6C46",
      "#E47D72",
      "#8A456E",
      "#B325E6",
      "#CB3BD1",
      "#BD6BDB",
      "#B789EB",
      "#8170E5",
      "#3934C8",
      "#4E298D",
      "#0C2465"
    ],
    borderWidth: 0
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i]
    labels1.push(registro.locations)
    dados1.datasets[0].data.push(registro.likes)
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels1)
  console.log('Dados:')
  console.log(dados1.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config1 = {
  type: "pie",
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          usePointStyle: true,
          font: {
            size: 18,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(25, 10, 25, 0.9)",
        borderColor: "#ff7a18",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#fff"
      }
    }
  }
  };

  // Adicionando gráfico criado em div na tela
  let myChart1 = new Chart(
    document.getElementById(`grafProp`),
    config1
  )

  setTimeout(() => atualizarGrafico(idPais, dados1, myChart1), 2000);
}