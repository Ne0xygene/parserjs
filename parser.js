/* global $ */
var author = "http://167.114.235.228:3000/authors/";
var book = "http://167.114.235.228:3000/books/";        // Initialisation of routes and array (each number corresponds to the id of the authors in ascending order.
var array = [0, 0, 0, 0];


function parse_book() {
    for (var i = 1; i <= 7; i++) {
        $.getJSON(book + i, function (data) {
            if (data.year == 1987) {
                $.getJSON(author + data.author, function (a_data) {
                    if (a_data.id == data.author) {                                                                     // Retrieve the author that wrote a book in 1987.
                        console.log(a_data.firstname + " " + a_data.lastname +                                          // Display it in the console and in the html page.
                            " wrote " + data.title + " in " + data.year);                                               //
                        document.write(a_data.firstname + " " + a_data.lastname +
                            " wrote " + data.title + " in " + data.year);
                    }
                });
            }
            switch (data.author) {
                case 1:
                    array[0]++;
                    break;
                case 2:
                    array[1]++;                                                                                         //
                    break;                                                                                              // Increase each value of the array (each corresponding to an author).
                case 3:                                                                                                 //
                    array[2]++;
                    break;
                case 4:
                    array[3]++;
                    break;
            }
        });
        if (i == 7) {
            for (var k = 1; k < 5; k++) {
                $.getJSON(author + k, function (b_data) {
                    var val = array.indexOf(Math.max(...array)
                )
                    +1;                                                                                                 // Get the index of the highest array value (correspond to the author
                    if (b_data.id == val) {                                                                             // who wrote the most books).
                        console.log(b_data.lastname + " : author");
                        document.write(b_data.firstname + " " + b_data.lastname +                                       //
                            " wrote " + array[val - 1] + " books.<br>");                                                // Display the author who wrote the most books in the list.
                        document.write(b_data.firstname + " " + b_data.lastname +                                       //
                            " wrote the most books in the list.<br>");
                    }
                });
            }
        }
    }
}
parse_book(); // Call of the function.



// /!\ THIS IS A FIRST PROTOTYPE OF THE PARSER. IT DOESN'T WORK WELL BECAUSE OF "ASYNCHRONICITY". ERRORS CAN HAPPENED /!\
// INDEX.JS IS THE ONE WHICH WORKS BY USING PROMISES TO CREATE A SYNCHRONICITY.