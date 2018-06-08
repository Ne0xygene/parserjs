/* global $ */
var u_author = "http://167.114.235.228:3000/authors/";
var u_book = "http://167.114.235.228:3000/books/";                                                                      // Initialisation of routes and array (each number corresponds to the id of the authors in ascending order.

function parse_book() {

    var authors = [];                                                                                                   // Authors array;
    var books = [];                                                                                                     // Books array;

    function author(firstname, lastname, id) {
        this.firstname = firstname;
        this.lastname = lastname;                                                                                       // Author struct ("object")
        this.id = id;
    }
    function book(id, author, title, year) {
        this.id = id;
        this.author = author;
        this.title = title;                                                                                             // Book struct ("object")
        this.year = year;
    }

    var add_authors = function () {
        return new Promise(function (resolve, reject) {
            var add_author = function (a_data) {
                if (a_data != null) {
                    //console.info(a_data); // Allow to display the json format;
                    authors.push(new author(a_data.firstname, a_data.lastname, a_data.id));                             // Function that add an author to the array authors.
                }
                else
                    a_data = {id: 0};
                if (a_data.id != 4)
                    $.getJSON(u_author + (a_data.id + 1), add_author);                                                  // GET HTTP Request using JQuery.
                else
                    resolve();
            };
            add_author(null);
        });


    };
    var add_books = function () {
        return new Promise(function (resolve, reject) {
            var add_book = function (b_data) {
                if (b_data != null) {
                    //console.info(b_data); // Allow to display the json format;
                    books.push(new book(b_data.id, b_data.author, b_data.title, b_data.year));                          // Function that add a book to the array books.
                }
                else
                    b_data = {id: 0};
                if (b_data.id != 7)
                    $.getJSON(u_book + (b_data.id + 1), add_book);                                                      // GET HTTP Request using JQuery.
                else
                    resolve();
            };
            add_book(null);
        });
    }

    var get_author_1987 = function () {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < books.length; i++) {
                if (books[i].year == 1987) {                                                                            // Get the author who wrote a book in 1987.
                    console.log("Author : " + authors[books[i].author - 1].firstname + " " +
                        authors[books[i].author - 1].lastname);
                    console.log("Book's name : " + books[i].title);                                                     // Print in the console and in html page
                    $("#year").html(authors[books[i].author - 1].firstname + " " +                                      // the author who wrote a book in 1987.
                        authors[books[i].author - 1].lastname +
                        " wrote " + books[i].title + " in 1987.");
                    resolve();
                    break;
                }
            }
        });
    }

    var get_author_most_books = function () {
        return new Promise(function (resolve, reject) {
            var success = 0;
            var array = [0, 0, 0, 0];
            for (var i = 0; i < books.length; i++) {
                switch (books[i].author) {
                    case 1:
                        array[0]++;
                        break;
                    case 2:
                        array[1]++;                                                                                     // switch that increase an array of four
                        break;                                                                                          // values, each corresponding to an author id.
                    case 3:                                                                                             // The highest nb in the array correspond to
                        array[2]++;                                                                                     // the author who wrote the most books.
                        break;
                    case 4:
                        array[3]++;
                        break;
                }
                if (i == books.length - 1) {
                    var val = array.indexOf(Math.max(...array)                                                          // Get the author with the most books written.
                )
                    +1;
                    console.log("Authors with most books written : " + authors[val - 1].firstname + " " +
                        authors[val - 1].lastname);
                    console.log("Max books : " + array[val - 1]);                                                       // Print in the console and in html
                    $("#max_books").html(authors[val - 1].firstname + " " + authors[val - 1].lastname +                 // the author who wrote the most books.
                        " wrote the most books in the list.<br>" + "He wrote 3 books.<br>");
                    success = 1;
                }
            }
            if (success == 1)
                resolve();
        });
    }

    var add_to_table = function() {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < 7; i++) {
                $("#book_" + (i + 1) + "_b").html(books[i].title);
                $("#book_" + (i + 1) + "_a").html(authors[books[i].author - 1].firstname +
                    " " + authors[books[i].author - 1].lastname);                                                       // Create table
                $("#book_" + (i + 1) + "_y").html(books[i].year);
                if (i == 7)
                        resolve();
            }
        });
    }

    add_authors().then(add_books).then(get_author_1987).then(get_author_most_books).then(add_to_table);                 // Allow the data to be treat synchronously;
}                                                                                                                       // Use of promises to allow it.

parse_book();
