document.querySelector('button').addEventListener('click', getMCU)

function getMCU() {

    let id = Number(document.querySelector('input').value)

    // carousel // need to rework
    document.querySelector('.leftArrow').addEventListener('click', function() {
        id -= 1
        goFetch(id)
    })
    document.querySelector('.rightArrow').addEventListener('click', function() {
        id += 1
        goFetch(id)
    })
    
    function goFetch(id) {
        fetch(`https://mcuapi.herokuapp.com/api/v1/movies/${id}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            document.querySelector('h2').innerText = data.title
            document.querySelector('.movieID').innerText = data.id
            document.querySelector('img').src = data.cover_url
            document.querySelector('h3').innerText = `Directed by: ${data.directed_by}`
            document.querySelector('.overview').innerText = `${data.overview}`
            document.querySelector('.phase').innerText = `Phase: ${data.phase}`
            document.querySelector('.postCreditScenes').innerText = `Number of post credit scenes: ${data.post_credit_scenes}`
            document.querySelector('.releaseDate').innerText = `Release: ${data.release_date}`
            document.querySelector('.imdb').innerText = `IMDB`
            document.querySelector('.imdb').href = `https://www.imdb.com/title/${data.imdb_id}`
            document.querySelector('iframe').src = data.trailer_url
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    }

goFetch(id)

// to unhide arrows and trailer only once
    function unhide() {
        document.querySelector('.hidden').classList.toggle('hidden');
        document.querySelector('.hiddenAlso').classList.toggle('hiddenAlso');
        unhide = function() {};
    }
    
unhide()

}

