document.querySelector('button').addEventListener('click', getMCU)

let id = 1

function getMCU() {
    //sets id to an integer
    id = ~~Number(document.querySelector('input').value)
    //if the number is above 0, fetch and unhide (id will be zero if the value of the input was NaN)
    if (id > 0) {
        goFetch(id)
        unhide()
    }
}

function goFetch(id) {
    fetch(`https://mcuapi.herokuapp.com/api/v1/movies/${id}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            document.querySelector('.movieID').innerText = data.id
            document.querySelector('h2').innerText = data.title
            document.querySelector('img').src = data.cover_url
            document.querySelector('h3').innerText = `Directed by: ${data.directed_by}`

            if (data.overview == null) {
                document.querySelector('.overview').innerText = ''
            } else {
                document.querySelector('.overview').innerText = `${data.overview}`
            }

            if (data.phase == null) {
                document.querySelector('.phase').innerText = ''
            } else {
                document.querySelector('.phase').innerText = `Phase: ${data.phase}`
            }

            if (data.post_credit_scenes == null) {
                document.querySelector('.postCreditScenes').innerText = ''
            } else {
                document.querySelector('.postCreditScenes').innerText = `Number of post credit scenes: ${data.post_credit_scenes}`
            }
            
            if (data.release_date == null) {
                document.querySelector('.releaseDate').innerText = ''
            } else {
                document.querySelector('.releaseDate').innerText = `Release: ${data.release_date}`
            }

            if (data.trailer_url == null) {
                document.querySelector('iframe').src = ''
            } else {
                document.querySelector('iframe').src = data.trailer_url
            }


            document.querySelector('.imdb').innerText = `IMDB`
            document.querySelector('.imdb').href = `https://www.imdb.com/title/${data.imdb_id}`

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

// unhide function will only run once
function unhide() {
    document.querySelector('.hidden').classList.toggle('hidden');
    document.querySelector('.hiddenAlso').classList.toggle('hiddenAlso');
    unhide = function () { };
}

document.querySelector('.leftArrow').addEventListener('click', function () {
    //checks to see if the value is more than one so it doesn't go negative
    if (id > 1) {
        id -= 1
        console.log(`${id} Left arrow`)
        goFetch(id)
        console.log(`${id} Left arrow after call`)
    } else {
        id = 36
    }
})
document.querySelector('.rightArrow').addEventListener('click', function () {
    if (id == 35) {
        id = 0
    } else if (id < 35) {
        id += 1
        console.log(`${id} Right arrow`)
        goFetch(id)
        console.log(`${id} Right arrow after call`)
    }
})