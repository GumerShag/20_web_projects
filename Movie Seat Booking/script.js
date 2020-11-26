let selectedSeats = [];
const onSeatsClick = (event) => {
    const seatId = event.target.id;
    if (!seatId) return;
    if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(id => id !== seatId);
        count.innerHTML = selectedSeats.length
        price.innerHTML = selectedSeats.length * select.value;
        document.getElementById(seatId).className = 'seat';
        return;
    }
    selectedSeats.push(seatId);
    selectedSeats.forEach(seatId => {
        document.getElementById(seatId).className = 'seat selected'
    })
    count.innerHTML = selectedSeats.length
    price.innerHTML = selectedSeats.length * select.value;
}
const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }
const onContentLoaded = () => {
    const seats = document.getElementById('seats')
    seats.innerHTML = addSeats(6, 9);
    seats.addEventListener('click', onSeatsClick)
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
