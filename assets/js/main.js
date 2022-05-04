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
                document.querySelector('body').classList.add('is-preload')
                // document.querySelector('article').classList.add('is-preload')
                document.querySelector('.movieImage').src = movie.cover_url
                document.querySelector('.mcuBackground').style.backgroundImage = `url('${movie.cover_url}')`
                setTimeout(function() {
                  document.querySelector('body').classList.remove('is-preload')
              //     document.querySelector('body').classList.remove('article')
              }, 100);

              document.querySelector('.mcuTitle').innerText = movie.title
              document.querySelector('.mcuRelease').innerText = `Released: ${movie.release_date}`
              document.querySelector('.mcuDirector').innerText = `Directed by: ${movie.directed_by}`
              document.querySelector('.mcuOverview').innerText = movie.overview
            }
          })
        })

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

getMCU()


function getMCUSeries(){
  const url = 'https://mcuapi.herokuapp.com/api/v1/tvshows/'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
          // list all movies into an array
          let series = []
          const selectSeries = document.querySelector('#selectSeries')
          data.data.map((el) => series.push(el.title))
          console.log(series)
          function makeSeriesSelect() {
            for(let i = 0; i < series.length; i++) {
              let optn = series[i];
              let el = document.createElement('option');
              el.textContent = `${data.data[i].id}. ${optn}`;
              el.value = optn;
              selectSeries.appendChild(el);
            }
          }
          makeSeriesSelect()

          document.querySelector('#selectSeries').addEventListener('change', displaySeries => {
            console.log(displaySeries.target.value)
            let seriesChoice = displaySeries.target.value
            data.data.map(el => {
              if(el.title == seriesChoice) {
                  document.querySelector('body').classList.add('is-preload')
                  // document.querySelector('article').classList.add('is-preload')
                  document.querySelector('.seriesImage').src = el.cover_url
                  document.querySelector('.mcuBackground').style.backgroundImage = `url('${el.cover_url}')`
                  setTimeout(function() {
                    document.querySelector('body').classList.remove('is-preload')
                //     document.querySelector('body').classList.remove('article')
                }, 100);
  
                document.querySelector('.mcuSeriesTitle').innerText = el.title
                document.querySelector('.mcuSeriesRelease').innerText = `Released: ${el.release_date}`
                document.querySelector('.mcuSeriesDirector').innerText = `Directed by: ${el.directed_by}`
                document.querySelector('.mcuSeriesNumOfEps').innerText = `Number of episodes: ${el.number_episodes}`
                document.querySelector('.mcuSeriesOverview').innerText = el.overview
              }
            })
          })
  
        })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

getMCUSeries()


// document.querySelector('.close').addEventListener('click', resetBackground)

function resetBackground(){
  const url = 'https://www.whenisthenextmcufilm.com/api'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        
        document.querySelector('.mcuBackground').style.backgroundImage = `url('${data.poster_url}')`
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}