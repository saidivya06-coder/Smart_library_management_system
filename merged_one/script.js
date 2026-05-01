class Book {
    constructor(id, img, title, author, location, count,price) {
        this.id = id;
        this.img = img;
        this.title = title;
        this.author = author;
        this.location = location;
        this.count = count;
        this.price=price;
    }
}



let books = [
    // 📘 DBMS (repeat)
    new Book(1,"../Images/Books/b1.jpg","Database System Concepts","Abraham Silberschatz",["1","1","1"],10,750),
    new Book(2,"../Images/Books/b2.jpg","Operating System Concepts","Abraham Silberschatz",["1","1","2"],12,900),

    // 📗 TOC
    new Book(3,"../Images/Books/b3.jpg","Introduction to Automata Theory","Hopcroft",["1","2","1"],8,820),

    // 📙 COA
    new Book(4,"../Images/Books/b4.jpg","Computer Organization and Design","David Patterson",["1","3","1"],10,950),

    // 🌐 Web (repeat)
    new Book(5,"../Images/Books/b5.jpg","HTML and CSS","Jon Duckett",["2","1","1"],15,450),
    new Book(6,"../Images/Books/b6.jpg","JavaScript and JQuery","Jon Duckett",["2","1","2"],12,500),

    // 💻 C++
    new Book(7,"../Images/Books/b7.jpg","Object Oriented Programming C++","E Balagurusamy",["2","2","1"],14,600),
    new Book(8,"../Images/Books/b8.jpg","Programming in C++","E Balagurusamy",["2","2","2"],11,620),

    // ☕ Java (repeat)
    new Book(9,"../Images/Books/b9.jpg","Java Complete Reference","Herbert Schildt",["2","3","1"],11,900),
    new Book(10,"../Images/Books/b10.jpg","Java Programming Guide","Herbert Schildt",["2","3","2"],9,850),

    // 🐍 Python
    new Book(11,"../Images/Books/b11.jpg","Python Crash Course","Eric Matthes",["2","3","3"],10,750),

    // 📊 Probability (repeat)
    new Book(12,"../Images/Books/b12.jpg","Probability and Statistics","Sheldon Ross",["3","1","1"],7,880),
    new Book(13,"../Images/Books/b13.jpg","Introduction to Probability Models","Sheldon Ross",["3","1","2"],6,920),

    // ➗ Mathematics
    new Book(14,"../Images/Books/b14.jpg","Discrete Mathematics","Kenneth Rosen",["3","1","3"],12,850),

    // 📖 Coding
    new Book(15,"../Images/Books/b15.jpg","Clean Code","Robert C Martin",["3","2","1"],9,950),

    // 🌐 Advanced Web
    new Book(16,"../Images/Books/b16.jpg","Node.js Design Patterns","Mario Casciaro",["3","2","2"],6,700),

    // 📚 Novels
    new Book(17,"../Images/Books/b17.jpg","The Alchemist","Paulo Coelho",["4","1","1"],18,300),

    // 📘 Systems
    new Book(18,"../Images/Books/b18.jpg","Computer Networks","Andrew Tanenbaum",["4","2","1"],7,850),

    // 🧠 AI
    new Book(19,"../Images/Books/b19.jpg","Artificial Intelligence","Stuart Russell",["4","3","1"],5,1100),

    // 📚 Novel
    new Book(20,"../Images/Books/b20.jpg","1984","George Orwell",["5","1","1"],20,350)
];

localStorage.setItem("allBooks", JSON.stringify(books));
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
function login(){
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let bookInput = document.getElementById("book").value.toLowerCase().trim();
    let authorInput = document.getElementById("author").value.toLowerCase().trim();

    if(!name || !roll || !bookInput || !authorInput){
        alert("Please fill all fields");
        return;
    }

    let foundBook = books.find(b =>
        b.title.toLowerCase().includes(bookInput) &&
        b.author.toLowerCase().includes(authorInput)
    );

    if(!foundBook){
        alert("Book not found!");
        return;
    }

    // Save user
    localStorage.setItem("username", name);

    // ✅ SWITCH INSIDE MISSING SECTION
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("qrSection").classList.remove("d-none");

    // Show details
    document.getElementById("bookDetails").innerHTML = `
        <img src="${foundBook.img}" width="100" onerror="this.src='https://via.placeholder.com/100'">
        <h5>${foundBook.title}</h5>
        <p><strong>Author:</strong> ${foundBook.author}</p>
        <p><strong>Amount:</strong> ₹${foundBook.price}</p>
        <hr>
        <p><strong>${name}</strong></p>
        <p>UserID: ${roll}</p>
    `;
}

function pay(){
    let name = localStorage.getItem("username") || "User";
    alert("Payment Successful ✅\nThank you " + name);
}

