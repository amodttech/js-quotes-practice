const url = 'http://localhost:3000/quotes?_embed=likes'
const quoteUl = document.querySelector("ul")


// ----------  Get and Render from DB

// fucntion getLikes() {
//     fetch(url)
//     .then(response => response.json())
//     .then(results => {
//         results.forEach(element => renderQuotes(element))
//     })
// }

// }

function getQuotes() {
    fetch(url)
        .then(response => response.json())
        .then(results => {
            results.forEach(element => renderQuotes(element))
        })
}

function renderQuotes(results) {
    const quoteLikes = 0

    const quoteListTag = document.createElement('li')
    quoteListTag.className = "quote-card"

    const quoteBlockquote = document.createElement('blockquote')
    quoteBlockquote.className = "blockquote"

    const quoteP = document.createElement('p')
    quoteP.className = "mb-0"
    quoteP.textContent = results.quote
    console.log(quoteP)

    const quoteFooter = document.createElement('footer')
    quoteFooter.className = "blockquote-footer"
    quoteFooter.textContent = results.author

    const br = document.createElement('br')
        // const span = document.createElement('span')
        // span.textContent = quoteLikes
    const quoteLikesButton = document.createElement('button')
    quoteLikesButton.className = "btn-success"
    quoteLikesButton.textContent = `Likes: ${quoteLikes}`
    quoteLikesButton.dataset.id = results.id

    const quoteDeleteButton = document.createElement('button')
    quoteDeleteButton.className = "btn-danger"
    quoteDeleteButton.textContent = "Delete"
    quoteDeleteButton.dataset.id = results.id

    quoteBlockquote.append(quoteP, quoteFooter, br, quoteLikesButton, quoteDeleteButton)
    quoteListTag.appendChild(quoteBlockquote)
    quoteUl.appendChild(quoteListTag)

    ///------------- LIKES -------------------
    quoteListTag.addEventListener("click", (event) => {
        if (event.target.matches(".btn-success")) {
            console.log('like cliic')
                //get target ID


            //compare target id with like id

            //if match, then update



            // const quoteId = event.target.dataset.id
            // const quoteListing = event.target.closest(".quote-card")
            // fetch(`http://localhost:3000/quotes/${quoteId}`, {
            //         method: "DELETE"
            //     })
            //     .then(quoteListing.remove())
        }
    })

    ///-------------  DELETE ----------------
    quoteListTag.addEventListener("click", (event) => {
        if (event.target.matches(".btn-danger")) {
            const quoteId = event.target.dataset.id
            const quoteListing = event.target.closest(".quote-card")
            fetch(`http://localhost:3000/quotes/${quoteId}`, {
                    method: "DELETE"
                })
                .then(quoteListing.remove())
        }
    })




}

//---------- Form Listener

const quoteForm = document.querySelector("#new-quote-form")

quoteForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const newQuoteObj = {
        quote: event.target.quote.value,
        author: event.target.author.value
    }
    const objConfig = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuoteObj)
    }
    fetch(url, objConfig)
        .then(response => response.json())
        .then(results => renderQuotes(results))
        .then(quoteForm.reset())
})






getQuotes()