const counter = document.getElementById("counter");

counter.addEventListener("click", function () {
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
});
