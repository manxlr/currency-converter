async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
  
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount!');
      return;
    }
  
    // Make an API call to get the exchange rate
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
  
    if (data.error) {
      alert('Error fetching exchange rates!');
      return;
    }
  
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
  
    // Update the result on the UI
    document.getElementById('converted-amount').innerText = convertedAmount;
  }
  