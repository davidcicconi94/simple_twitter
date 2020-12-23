// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];




// EVENT LISTENERS
eventListeners();
function eventListeners(){
    // Usuario agrega un nuevo tweet
    formulario.addEventListener('submit' , agregarTweet);

    // Cuando el documentto está listo
    document.addEventListener('DOMContentLoaded' , () => {
        localStorage.getItem('tweets');
        console.log(tweets);
        crearHTML();
    })
}



// FUNCIONES
function agregarTweet(e){
    e.preventDefault();

    // Textarea
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if(tweet === ''){
        mostrarError('No has escrito ningún tweet')
        return; 
    } 
  
    const tweetObj = {
        id: Date.now(),
        tweet: tweet,
    }
    

    // Añadir al array 'tweets'
    tweets = [...tweets , tweetObj];
    console.log(tweets)

    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}


// Mostrar error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en contenindo
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Tiempo del mensaje
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}


// Mostrar listado de tweets
function crearHTML(){
    limpiarHTML();
            
    if(tweets.length > 0){
        tweets.forEach( tweet => {

            // Agregar un boton
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.textContent = 'X';

            // Funcion de eliminar
            btnDelete.onclick = () => {
                borrarTweet(tweet.id);
            }
            
            // Crear el HTML
            const li = document.createElement('li');

            // Añadir texto
            li.innerText = tweet.tweet;

            // Asignar boton
            li.appendChild(btnDelete);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}


// Agrega los tweets actuales al local Storage
function sincronizarStorage(){
    localStorage.setItem('tweet' , JSON.stringify(tweets));
}


// Elimina tweet
function borrarTweet(id){ 
    tweets = tweets.filter(tweet => tweet.id !== id);
    console.log(tweets);
    crearHTML();
}


// Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}



