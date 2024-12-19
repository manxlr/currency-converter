// Function to convert currency
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
  
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount!');
      return;
    }
  
    // Show loading spinner
    document.getElementById('spinner').style.display = 'block';
  
    try {
      // Fetch conversion rates from the freecurrencyapi.com API
      const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_cwhUu8oHGGRXIx1jsq9MfNGMjNpQna4An7EOEaik&base_currency=${fromCurrency}&currencies=${toCurrency}`);
      const data = await response.json();
  
      // Check for a successful response
      if (data.data) {
        // Extract the conversion rate
        const rate = data.data[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
  
        // Display the result
        document.getElementById('converted-amount').innerText = `${convertedAmount} ${toCurrency}`;
      } else {
        alert('Error fetching exchange rates. Please try again.');
      }
  
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      alert('Error fetching exchange rates.');
    } finally {
      // Hide loading spinner
      document.getElementById('spinner').style.display = 'none';
    }
  }
  