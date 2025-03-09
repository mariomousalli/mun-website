window.onload = function() {
    function(hamberger) {
        var b = document.getElementById("hamberger");
        b.addEventListener("click", function() {
            var x = document.getElementById("menu");
            if (x.className === "menu") {
                x.className += " responsive";
            } else {
                x.className = "menu";
            }
        });
    }