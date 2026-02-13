
// søgefunktion inspireret af W3Schools: https://www.w3schools.com/howto/howto_js_filter_lists.asp--> 
function myFunction() {
  var input, filter, products, i, button, txtValue;

  input = document.getElementById("myInput"); // inputfeltet skal have id="myInput" for at denne funktion virker
  filter = input.value.toUpperCase(); // Gør søgeordet stort for at gøre søgningen uafhængig af store/små bogstaver
  products = document.getElementsByClassName("billede-container"); // henter alle "produktkort"

  for (i = 0; i < products.length; i++) { //loop igennem alle produktkort - et adgangen 
    button = products[i].getElementsByClassName("tilføj-kurv")[0]; // henter knappen (den første)) inde i hvert produktkort, som har klassen "tilføj-kurv", der er her produktnavnet er gemt som en attribut "data-product-name"
    txtValue = button.getAttribute("data-product-name"); // henter produktnavnet fra knappen

    // if-else: hvis pruduktnavnet indeholder søgeordet, vises det, ellers skjules det
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      products[i].style.display = "";
    } else {
      products[i].style.display = "none";
    }
  }
}

//Pensum: DOM manipulation, Loops, If/else, Data-attributter, Case-insensitive søgning