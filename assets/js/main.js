function getFetch(){
  const url = 'https://www.whenisthenextmcufilm.com/api'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        console.log(data.title)
        document.querySelector('.title').innerText = data.title

        document.querySelector('.releaseDate').innerText = `Release date: ${data.release_date}`

        // cannot select #bg:after psuedo element
        // added class to html element + added class to CSS styles for #bg:after
        document.querySelector('#bg').classList.add('mcuBackground')
        // selected class to change bg image
        document.querySelector('.mcuBackground').style.backgroundImage = `url('${data.poster_url}')`

        // COUNTDOWN
        const parts = data.release_date.split('-')
        let releaseDate = new Date(parts[0], parts[1] - 1, parts[2]); 
        // console.log(releaseDate);
        countdown(releaseDate)  

        // article
        document.querySelector('.major').innerText = data.title
        document.querySelector('img').src = data.poster_url
        document.querySelector('.overview').innerText = data.overview
        document.querySelector('.fullImage').href = data.poster_url
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

getFetch()


function countdown(countDownDate) {
  setInterval(function() {
let now = new Date();
  // Find the distance between now and the count down date
  // console.log(countDownDate)
  // console.log(now)
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // console.log(days)

  document.querySelector('.countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`

}), 1000}


// ALL MCU

function getMCU(){
  const url = 'https://mcuapi.herokuapp.com/api/v1/movies/'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        console.log(data.data[0].id)

        // list all movies into an array
        let movies = []
        const selectMovies = document.querySelector('#selectMovies')
        data.data.map((movie) => movies.push(movie.title))
        console.log(movies)
        function makeMovieSelect() {
          for(let i = 0; i < movies.length; i++) {
            let optn = movies[i];
            let el = document.createElement('option');
            el.textContent = `${data.data[i].id}. ${optn}`;
            el.value = optn;
            selectMovies.appendChild(el);
          }
        }
        makeMovieSelect()

        document.querySelector('#selectMovies').addEventListener('change', displayMovie => {
          console.log(displayMovie.target.value)
          let movieChoice = displayMovie.target.value
          data.data.map(movie => {
            if(movie.title == movieChoice) {
              document.querySelector('.movieImage').src = movie.cover_url
              document.querySelector('.mcuBackground').style.backgroundImage = `url('${movie.cover_url}')`
            }
          })
        })

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

getMCU()


// document.querySelector('.close').addEventListener('click', resetBackground)

function resetBackground(){
  const url = 'https://www.whenisthenextmcufilm.com/api'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        
        // cannot select #bg:after psuedo element
        // added class to html element + added class to CSS styles for #bg:after
        // document.querySelector('#bg').classList.add('mcuBackground')
        // selected class to change bg image
        document.querySelector('.mcuBackground').style.backgroundImage = `url('${data.poster_url}')`
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}