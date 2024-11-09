const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const select = document.querySelector("#movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();
container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});
select.addEventListener("change", function () {
  calculateTotal();
});

function calculateTotal() {
  let selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatArr.push(seat);
  });
  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });
  let selectedSeatIndexs = selectedSeatArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}
function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}
