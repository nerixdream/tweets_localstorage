//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Eventos
eventListeners();
function eventListeners() {
	//Escucha el boton de agregar
	formulario.addEventListener('submit', agregarTweet);

	//Agrega los tweets de localstorage al cargar el documento o crea el arreglo vacio
	document.addEventListener('DOMContentLoaded', () => {
		tweets = JSON.parse(localStorage.getItem('tweets')) || [];
		crearHTML();
	});
}

//Funciones

function agregarTweet(e) {
	e.preventDefault();

	const tweet = document.querySelector('#tweet').value;

	if (tweet === '') {
		mostrarError('Un mensaje no puede ir vacío');
		return; // Evita que el siguiente codigo se ejecute
	}

	//Un objeto donde se utiliza Date.now() para generar un ID
	tweetsObj = {
		id: Date.now(),
		tweet, //Si la llave y el valor son los mismos(tweet: tweet) se puede dejar uno solo
	};

	//Se crea una copia del arreglo
	tweets = [...tweets, tweetsObj];

	crearHTML();

	formulario.reset();
}

function mostrarError(error) {
	//Crea el html del error
	const mensajeError = document.createElement('p');
	mensajeError.textContent = error;
	mensajeError.classList.add('error');

	const contenido = document.querySelector('#contenido');
	contenido.appendChild(mensajeError);

	setTimeout(() => {
		mensajeError.remove();
	}, 2000);
}

function crearHTML() {
	limpiarHTML();

	if (tweets.length > 0) {
		tweets.forEach((tweet) => {
			//Crea el html del boton de borrar
			const btnBorrar = document.createElement('a');
			btnBorrar.classList.add('borrar-tweet');
			btnBorrar.textContent = 'X';

			//Llamar funcion para eliminar tweet
			btnBorrar.onclick = () => {
				eliminarTweet(tweet.id);
			};

			//Crea el html del tweet
			const li = document.createElement('li');
			li.textContent = tweet.tweet;
			li.appendChild(btnBorrar);

			//Se agrega al DOM
			listaTweets.appendChild(li);
		});
	}
	//Llama la funcion para guardar el localstorage
	sincronizandoStorage();
}

function sincronizandoStorage() {
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function eliminarTweet(id) {
	tweets = tweets.filter((tweet) => tweet.id != id);
	crearHTML();
}

function limpiarHTML() {
	while (listaTweets.firstChild) {
		listaTweets.removeChild(listaTweets.firstChild);
	}
}
