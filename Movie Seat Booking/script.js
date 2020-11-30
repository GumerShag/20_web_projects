let selectedSeats = [];
countSeats = () => document.querySelectorAll('.seats .selected').length;

const countPrice = (selectedSeatsCount) => {
    const selectedFilmPrice = document.getElementById('select');
    const value = +selectedFilmPrice.value;
    return selectedSeatsCount * value;
}
const onSeatsClick = (event) => {
    const seat = event.target;
    if (event.target.className.indexOf('row') > -1) {
        return;
    }
    seat.classList.toggle('selected')
    recalculateInfo();

}
onSelectChange = (event) => {
    recalculateInfo();
}
const recalculateInfo = () => {
    const seatsCount = countSeats();
    const priceCount = countPrice(seatsCount);
    count.innerHTML = seatsCount;
    price.innerHTML = priceCount;   
}
const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }
const onContentLoaded = () => {
    const seats = document.getElementById('seats')
    seats.innerHTML = addSeats(6, 9);
    seats.addEventListener('click', onSeatsClick)
    document.getElementById('select').addEventListener('change', onSelectChange)
}
const SEATS_STATUS = ['not-available', 'occupied', ''];
const addSeats = (rowsCount, rowSeats) => {
    let rows = '';
    for (let i = 0; i < rowsCount; i++) {
        const rowSeatsStatus = [...Array(rowSeats).fill(0)].map(() => SEATS_STATUS[Math.floor(Math.random()*SEATS_STATUS.length)]);
        rows = rows.concat(`
        <div class="row">
            ${generateSeats(rowSeatsStatus, i)}
        </div>`)
    }
    return rows;
}
const generateSeats = (rowSeats, currentRow) => {
    return rowSeats.map((seat, i) => {
        if (seat === 'selected') {
            selectedSeats.push(`${currentRow}-${i}`);
        }
        return `<div class="seat ${seat}" id="${currentRow}-${i}"></div>`
    }).join('');
}
document.addEventListener('DOMContentLoaded', onContentLoaded)
