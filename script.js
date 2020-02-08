const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const rateDOM = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate and update DOM
function calculate() {
  const currency_one_value = currencyOne.value;
  const currency_two_value = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one_value}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data.rates[currency_two_value];

      rateDOM.innerText = `1 ${currency_one_value} = ${rate} ${currency_two_value}`;

      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;

  calculate();
});

calculate();
