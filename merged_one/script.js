
let selectedBookId = null; // ✅ GLOBAL

// ================= NAVIGATION =================
function showPage(id){
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const page = document.getElementById(id);
    if(page) page.classList.add('active');

    window.scrollTo(0,0);
}


// ================= SCROLL ANIMATION =================
const elements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(position < screenHeight - 100){
            el.classList.add('show');
        }
    });
});


// ================= COMMON SEARCH SETUP =================
function setupSearch(section, mode){
    let selectedOption = "";

    const inputField = document.getElementById(`inputField-${section}`);
    const outputDiv = document.getElementById(`Output-${section}`);
    const searchBookDiv = document.getElementById(`SearchBook-${section}`);
    const searchform = document.getElementById(`searchform-${section}`);
    const dropdown = document.getElementById(`dropdown-${section}`);

    if(!inputField || !outputDiv || !searchform || !dropdown) return;

    dropdown.addEventListener('change', function () {
        selectedOption = this.value;
        outputDiv.innerHTML = "";
        if(searchBookDiv) searchBookDiv.innerHTML = "";
        inputField.value = "";
    });

    searchform.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!selectedOption) {
            alert("Please select search type");
            return;
        }

        let inputValue = inputField.value.toLowerCase();
        outputDiv.innerHTML = "";
        if(searchBookDiv) searchBookDiv.innerHTML = "";

        let results = [];

        if (selectedOption === "Book") {
            results = books.filter(book =>
                book.title.toLowerCase().includes(inputValue)
            );
        } 
        else if (selectedOption === "Author") {
            results = books.filter(book =>
                book.author.toLowerCase().includes(inputValue)
            );
        }

        if (results.length === 0) {
            outputDiv.innerHTML = "<tr><td>No results found</td></tr>";
            return;
        }

        // ================= LOCATE MODE =================
        if(mode === "locate"){
            outputDiv.innerHTML = `
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Locate</th>
            </tr>`;

            results.forEach(book => {
                let row = outputDiv.insertRow();
                row.id = `locate-${book.id}`;

                row.insertCell(0).innerHTML =
                `<img src="${book.img}" width="50" onerror="this.src='https://via.placeholder.com/50'">`;

                row.insertCell(1).textContent = book.title;
                row.insertCell(2).textContent = book.author;

                row.insertCell(3).innerHTML =
                `<button class="btn btn-success btn-sm locate-btn" data-id="${book.id}">Locate</button>`;
            });

            document.querySelectorAll('.locate-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const id = Number(this.dataset.id);
                    const book = books.find(b => b.id === id);

                    let display = `
                    <h4 class="mb-3">Rack No ${book.location[0]}</h4>
                    <div class="rack">
                        <div class="s r1 s1">1</div>
                        <div class="s r1 s2">2</div>
                        <div class="s r1 s3">3</div>
                        <div class="s r2 s1">4</div>
                        <div class="s r2 s2">5</div>
                        <div class="s r2 s3">6</div>
                        <div class="s r3 s1">7</div>
                        <div class="s r3 s2">8</div>
                        <div class="s r3 s3">9</div>
                    </div>`;

                    searchBookDiv.innerHTML = display;

                    let cls = `s r${book.location[1]} s${book.location[2]}`;
                    let element = document.getElementsByClassName(cls)[0];
                    if (element) element.style.backgroundColor = "pink";
                });
            });
        }

        // ================= ISSUE MODE =================
        if(mode === "issue"){
            outputDiv.innerHTML = `
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Count</th>
                <th>Issue</th>
            </tr>`;

            results.forEach(book => {
                let row = outputDiv.insertRow();
                row.id = `issue-${book.id}`;

                row.insertCell(0).innerHTML =
                `<img src="${book.img}" width="50" onerror="this.src='https://via.placeholder.com/50'">`;

                row.insertCell(1).textContent = book.title;
                row.insertCell(2).textContent = book.author;
                row.insertCell(3).textContent = book.count;

                row.insertCell(4).innerHTML =
                `<button class="btn btn-warning btn-sm issue-btn" data-id="${book.id}">Issue</button>`;
            });

            document.querySelectorAll('.issue-btn').forEach(button => {
                button.addEventListener('click', function () {
                    selectedBookId = Number(this.dataset.id);

                    let popup = document.getElementById("detdiv");
                    document.getElementById("overlay").style.display="flex";
                });
            });
        }

    }); // ✅ closes submit
} // ✅ closes setupSearch


// ================= FORM SUBMIT (RUNS ONCE) =================
const detdiv = document.getElementById("detdiv");

detdiv.addEventListener("submit", function(e){
    e.preventDefault();
    const userId=document.getElementById("userId").value;

    const bookData = books.find(b => b.id === selectedBookId);

    if (!bookData) return;

    if (bookData.count > 0) {

        bookData.count--;

        document.getElementById(`issue-${bookData.id}`)
        .cells[3].textContent = bookData.count;

        const d = new Date();
        d.setDate(d.getDate() + 15);

        alert(`The Book "${bookData.title}" by ${bookData.author} has been issued to \n User Id : ${userId}.\nReturn by ${d.toDateString()}`);

        document.getElementById("overlay").style.display = "none";
    } 
    else {
        alert("Book is out of stock!");
    }
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

        issuedBooks.push({
            userId: userId,
            bookId: bookData.id,
            title: bookData.title,
            returnDate: d.toDateString()
        });

        localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
});


// ================= INITIALIZE =================
document.addEventListener("DOMContentLoaded", () => {
    setupSearch('locate', 'locate');
    setupSearch('issue', 'issue');
});
