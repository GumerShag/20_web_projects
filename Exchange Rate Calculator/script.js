const API_KEY = '28d1ac2983647afe6a5945b1';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/`
const setAllCurrencyCodes = () => {
    fetch(`${BASE_URL}/latest/USD`).then(async response => {
        const data = await response.json();
        const firstSelect = document.getElementById('firstSelect');
        const secondSelect = document.getElementById('secondSelect');
        let optionList = '';
        for (let key of Object.keys(data.conversion_rates)) {
            optionList = optionList.concat(`<option value="${key}">${key}</option>`);
        }
        firstSelect.innerHTML = optionList;
        secondSelect.innerHTML = optionList
    })
}

const calculate = () => {

}
const firstSelect = document.getElementById('firstSelect');
const firstAmount = document.getElementById('firstAmount');
const secondSelect = document.getElementById('secondSelect');
const secondAmount = document.getElementById('secondAmount');

firstSelect.addEventListener('change', calculate);
firstAmount.addEventListener('input', calculate);
secondSelect.addEventListener('change', calculate);
secondAmount.addEventListener('input', calculate);
onContentLoaded = () => {
    setAllCurrencyCodes();
}
document.addEventListener('DOMContentLoaded', onContentLoaded);