const API_KEY = '28d1ac2983647afe6a5945b1';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/`
const firstSelect = document.getElementById('firstSelect');
const firstAmount = document.getElementById('firstAmount');
const secondSelect = document.getElementById('secondSelect');
const secondAmount = document.getElementById('secondAmount');
const rate = document.querySelector('.rate');
const setAllCurrencyCodes = () => {
    return fetch(`${BASE_URL}/latest/USD`).then(async response => {
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
const getRates = (currency) => 
    fetch(`${BASE_URL}/latest/${currency}`)
    .then(res => res.json())
    .then(data => data.conversion_rates)

const calculate = async () => {
    const currencyOne = firstSelect.value;
    const currencyTwo = secondSelect.value;
    const rates = await getRates(currencyOne);
    rate.innerText = `1 ${currencyOne} = ${rates[currencyTwo]} ${currencyTwo}`;
    secondAmount.value = (firstAmount.value * rates[currencyTwo]).toFixed(2);
}


firstSelect.addEventListener('change', calculate);
firstAmount.addEventListener('input', calculate);
secondSelect.addEventListener('change', calculate);
secondAmount.addEventListener('input', calculate);
onContentLoaded = () => {
    setAllCurrencyCodes().then(calculate);
}
document.addEventListener('DOMContentLoaded', onContentLoaded);