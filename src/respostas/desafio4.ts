// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction
let apiKey: string; 
let requestToken: string;
let username: string; 
let password: string; 
let sessionId: string;
let listId: string;

let loginButton = document.getElementById('login-button') as HTMLInputElement;
let searchButton = document.getElementById('search-button') as HTMLInputElement;
let searchListButton = document.getElementById('searchListbutton') as HTMLInputElement;
let createListbutton = document.getElementById('createListbutton') as HTMLInputElement;
let addbutton = document.getElementById('addbutton') as HTMLInputElement;
let searchContainer = document.getElementById('search-container') as HTMLInputElement;
let search = document.getElementById('search') as HTMLInputElement;
let addNameList = document.getElementById('addNameList') as HTMLInputElement;
let senha = document.getElementById('senha') as HTMLInputElement;
let login = document.getElementById('login') as HTMLInputElement;
let apikey = document.getElementById('api-key') as HTMLInputElement;
let addfilmeid = document.getElementById('addMovieList') as HTMLInputElement;
let addfilmeList = document.getElementById('addList') as HTMLInputElement;
let newList = document.getElementById('addIdList') as HTMLInputElement;
let newDescList = document.getElementById('addDescList') as HTMLInputElement;
let searchEditContainer = document.getElementById('searchEdit-container') as HTMLInputElement;
let movielistok = document.getElementById('MovieList-ok') as HTMLInputElement;
let movielistnok = document.getElementById('MovieList-nok') as HTMLInputElement;
let newlistok = document.getElementById('newList-ok') as HTMLInputElement;
let newlistnok = document.getElementById('newList-nok') as HTMLInputElement;
let loginok = document.getElementById('login-ok') as HTMLInputElement;
let loginnok = document.getElementById('login-nok') as HTMLInputElement;
let searchMovieListnok = document.getElementById('searchMovieList-nok') as HTMLInputElement;
let searchMovie = document.getElementById('search-movie') as HTMLInputElement;
let detailsButton = document.getElementById('details-button') as HTMLInputElement;
let showMovie = document.getElementById('show-movie') as HTMLInputElement;
let listNok = document.getElementById('list-nok') as HTMLInputElement;
let addNok = document.getElementById('add-nok') as HTMLInputElement;

interface InterfaceHttp {
  url: string;
  method: string;
  body?: {
    username: string,
    password: string,
    request_token: string
  }
}

if (loginButton) {
  loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
  })
}

if (detailsButton) {
  detailsButton.addEventListener('click', async () => {
    let listMovie = document.getElementById("listMovie");
    if (listMovie) {
      listMovie.outerHTML = "";
    }
    let movieId = searchMovie.value;
    let item: any = await adicionarFilme(movieId);
    let div1 = document.createElement('div');
    div1.className = "details-group";
    div1.id = "listMovie";
    let img = document.createElement('img');
    img.className = "image";
    img.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
    div1.appendChild(img);
    let div2 = document.createElement('div');
    div2.className = "details-group2";
    div1.appendChild(div2);
    let ul = document.createElement('ul');
    ul.className = "list-group list-group-flush";
    div2.appendChild(ul);
    let li1 = document.createElement('li');
    li1.className = "list-group-item";
    li1.appendChild(document.createTextNode(` Titulo Original: ${item.original_title}`))
    ul.appendChild(li1);
    let li2 = document.createElement('li');
    li2.className = "list-group-item li-overview";
    li2.appendChild(document.createTextNode(` Descrição: ${item.overview}`));
    ul.appendChild(li2);
    showMovie.appendChild(div1);
  })
}

if (createListbutton) {
  createListbutton.addEventListener('click', async () => {
    let nameMovie = newList.value;
    let descList = newDescList.value;
    let result = await criarLista(nameMovie, descList);
    console.log(result);
  })
}

if (addbutton) {
  addbutton.addEventListener('click', async () => {
    let filmeId = addfilmeid.value;
    let idList = addfilmeList.value;
    let result = await adicionarFilmeNaLista(filmeId, idList);
    console.log(result);
  })
}

if (searchButton) {
  searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
      lista.outerHTML = "";
    }
    let query = search.value;
    let listaDeFilmes: any = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista";
    ul.className = "list-group list-group-flush";
    for (const item of listaDeFilmes.results) {
      let li = document.createElement('li');
      let i = document.createElement('i');
      li.className = "list-group-item li1";
      i.className = "bi bi-file-play-fill";
      li.appendChild(i);
      li.appendChild(i);
      li.appendChild(document.createTextNode(` Id: ${item.id} - ${item.original_title}`));
      ul.appendChild(li);
    }
    searchContainer.appendChild(ul);
  })
}



if (searchListButton) {
  searchListButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista2");
    if (lista) {
      lista.outerHTML = "";
    }
    let query = addNameList.value;
    let listaDeFilmes: any = await pegarLista(query);
    let ul = document.createElement('ul');
    ul.id = "lista2";
    ul.className = "list-group list-group-flush";
    for (const item of listaDeFilmes.items) {
      let li = document.createElement('li');
      let i = document.createElement('i');
      li.className = "list-group-item li1";
      i.className = "bi bi-file-play-fill";
      li.appendChild(i);
      li.appendChild(i);
      li.appendChild(document.createTextNode(` Id: ${item.id} - ${item.original_title}`))
      ul.appendChild(li)
    }
    searchEditContainer.appendChild(ul);
  })
}

function preencherSenha() {
  password = senha.value;
  validateLoginButton();
}

function preencherLogin() {
  username = login.value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = apikey.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get(InterfaceHttp: any) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(InterfaceHttp.method, InterfaceHttp.url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }
      if (InterfaceHttp.body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        InterfaceHttp.body = JSON.stringify(InterfaceHttp.body);
      }
      request.send(InterfaceHttp.body);
    })
  }
}

async function procurarFilme(query: string) {
  try {
    query = encodeURI(query)
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
      method: "GET"
    })
    return result
  } catch (error) {
    listNok.style.display = "block";
    setTimeout(() => {
      listNok.style.display = "none";
    }, 5000)
  }
}

async function adicionarFilme(filmeId: string) {
  try {
    let result = await HttpClient.get({
      url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
      method: "GET"
    })
    return result
  } catch (error) {
    addNok.style.display = "block";
    setTimeout(() => {
      addNok.style.display = "none";
    }, 5000)
  }
}

async function criarRequestToken() {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token;
}

async function logar() {
  try {
    let result: any = await HttpClient.get({
      url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
      method: "POST",
      body: {
        username: `${username}`,
        password: `${password}`,
        request_token: `${requestToken}`
      }
    })
    if (result.success) {
      detailsButton.disabled = false;
      searchButton.disabled = false;
      searchListButton.disabled = false;
      createListbutton.disabled = false;
      addbutton.disabled = false;
      loginok.style.display = "block";
      setTimeout(() => {
        loginok.style.display = "none";
      }, 5000)
    }
  } catch (error) {
    loginnok.style.display = "block";
    setTimeout(() => {
      loginnok.style.display = "none";
    }, 5000)
  }
}

async function criarSessao() {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
  try {
    let result: any = await HttpClient.get({
      url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
      method: "POST",
      body: {
        name: nomeDaLista,
        description: descricao,
        language: "pt-br"
      }
    })
    if (result.success) {
      addfilmeList.value = result.list_id.toString();
      addNameList.value = result.list_id.toString();
      newlistok.style.display = "block";
      setTimeout(() => {
        newlistok.style.display = "none";
      }, 5000)
    }
  } catch (error) {
    newlistnok.style.display = "block";
    setTimeout(() => {
      newlistnok.style.display = "none";
    }, 5000)
  }
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
  try {
    let result: any = await HttpClient.get({
      url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
      method: "POST",
      body: {
        media_id: filmeId
      }
    })
    if (result.success) {
      movielistok.style.display = "block";
      setTimeout(() => {
        movielistok.style.display = "none";
      }, 5000)
    }
  } catch (error) {
    movielistnok.style.display = "block";
    setTimeout(() => {
      movielistnok.style.display = "none";
    }, 5000)
  }
}

async function pegarLista(listId: string) {
  try {
    let result: any = await HttpClient.get({
      url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
      method: "GET"
    })
    return result;
  } catch (error) {
    searchMovieListnok.style.display = "block";
    setTimeout(() => {
      searchMovieListnok.style.display = "none";
    }, 5000)
  }
}