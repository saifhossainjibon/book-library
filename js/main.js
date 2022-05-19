document.getElementById('spinner').style.display = "none"
const bookContainer = document.getElementById('book-container')
const resultDiv = document.getElementById('result');

const searchButton = () => {
  const input = document.getElementById('input-field');
  const inputFieldText = input.value;
  bookContainer.innerHTML = ""
  resultDiv.innerHTML = ""
  input.value = '';
  document.getElementById('spinner').style.display = "block"
  const url = ` https://openlibrary.org/search.json?q=${inputFieldText}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data, data.docs))
}
const displayBooks = (result, books) => {
  resultDiv.textContent = ''
  bookContainer.textContent = ''
  resultDiv.innerHTML = `
  <h5 class="text-center text-info fw-bold ">${result.numFound ? result.numFound : 'No '} result found</h5>
  `

  books.forEach(book => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div class="card h-100">
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
          <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 2031035}-M.jpg" class="card-img-top"/>
            <h3 class="card-title fw-bold text-success">${book.title}</h3>
            <h4 class="text-info fw-bold">Author: ${book.author_name}</h4>
            <h5 class="fw-bold">First Published: ${book.first_publish_year}</h5>          
          </div>
        </div>
        `
    bookContainer.appendChild(div)
    document.getElementById('spinner').style.display = "none"
    // console.log(book.cover_i)
  })
}