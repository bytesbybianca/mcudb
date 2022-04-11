// // https://github.com/AugustoMarcelo/mcuapi

document.querySelector('button').addEventListener('click', getMCU)

function getMCU() {

    let id = Number(document.querySelector('input').value)
    console.log(id)
    console.log(`${id} after assignment`)
    document.querySelector('.leftArrow').addEventListener('click', function() {
        id -= 1
        console.log(`${id} Left arrow`)
        goFetch(id)
        console.log(`${id} Left arrow after call`)
    })
    document.querySelector('.rightArrow').addEventListener('click', function() {
        id += 1
        console.log(`${id} Right arrow`)
        goFetch(id)
        console.log(`${id} Right arrow after call`)
    })
    console.log(`${id} get MCU before goFetch`)
    // function leftMCU() {
    //     id -= 1
    //     console.log(id)
    //     goFetch()
    //     console.log(id)
    // }

    // function rightMCU() {
    //     id += 1
    //     console.log(id)
    //     goFetch()
    //     console.log(id)
    // }


    
    function goFetch(id) {
        fetch(`https://mcuapi.herokuapp.com/api/v1/movies/${id}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(`${id} in Fetch after id assignment`)
            // console.log(data) // to see all the data
            // // // // console.log(data.overview) // to see specific property
            document.querySelector('h2').innerText = data.title
            document.querySelector('.movieID').innerText = data.id
            // document.body.style.backgroundImage = `url(${data.cover_url})`
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
console.log(`${id} after fetch call`)

    function unhide() {
        document.querySelector('.hidden').classList.toggle('hidden');
        document.querySelector('.hiddenAlso').classList.toggle('hiddenAlso');
        unhide = function() {};
    }
    
unhide()

}

// getMCU()

