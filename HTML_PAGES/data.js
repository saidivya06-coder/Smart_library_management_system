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