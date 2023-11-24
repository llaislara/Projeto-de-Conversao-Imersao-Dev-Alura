/*************************************************************
 * ********************* MOEDAS  ************************
 * **********************************************************/ 

const API_KEY = '057677d8e54ba180ca177fa6a882e2e9'; 
let taxasDeCambio;

function showCurrencyConverter() {
  var name = document.getElementById('name').value;
  if (name.trim() === '') {
    alert('Insira seu nome antes de selecionar um programa.');
    return;
  }

  fromCurrency = document.getElementById('fromCurrency').value;
  document.getElementById('form-container').style.display = 'none';
  document.querySelector('.progdisp').style.display = 'none';
  document.getElementById('converter-buttons').style.display = 'none';
  document.getElementById('converter-program').style.display = 'block';
  updateInputPlaceholder();
  carregarTaxasDeCambio();
  document.getElementById('converter-program').style.display = 'block';
  document.getElementById('back-button').style.display = 'block';
  updateCurrencyOptions();
  
}

function carregarTaxasDeCambio() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      taxasDeCambio = data.rates;
    }
  };

  var url = `https://open.er-api.com/v6/latest`;
  xhr.open('GET', url, true);
  xhr.send();
}

function convertCurrency() {
  var name = document.getElementById('name').value;
  var fromCurrency = document.getElementById('fromCurrency').value;
  var toCurrency = document.getElementById('toCurrency').value;
  var amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || amount <= 0) {
    alert('Insira um valor válido para a conversão.');
    return;
  }


  var taxaDeCambio = taxasDeCambio[toCurrency] / taxasDeCambio[fromCurrency];

  var result = amount * taxaDeCambio;

  result = result.toFixed(2);  
  var resultText = `${name}, o resultado é $${result} ${toCurrency}`;


  document.getElementById('result-text').innerText = resultText;
  document.getElementById('back-button').parentNode.insertBefore(document.getElementById('result-box'), document.getElementById('back-button'));
  document.getElementById('result-box').style.display = 'block';
}

function voltar() {
  document.getElementById('form-container').style.display = 'block';
  document.querySelector('.progdisp').style.display = 'block';
  document.getElementById('converter-buttons').style.display = 'block';
  document.getElementById('converter-program').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';
}

function updateInputPlaceholder() {
  var fromCurrency = document.getElementById('fromCurrency').value;
  var toCurrency = document.getElementById('toCurrency').value;
  document.getElementById('amount').placeholder = `Valor em ${fromCurrency}`;
}

function updateCurrencyOptions() {
  var fromCurrencySelect = document.getElementById('fromCurrency');
  var toCurrencySelect = document.getElementById('toCurrency');
  var fromCurrencyValue = fromCurrencySelect.value;
  var toCurrencyValue = toCurrencySelect.value;

  fromCurrencySelect.innerHTML = '';
  toCurrencySelect.innerHTML = '';

  var moedasDisponiveis = ['BRL', 'USD', 'EUR', 'BTC', 'GBP', 'KRW'];

  for (var i = 0; i < moedasDisponiveis.length; i++) {
    var option = document.createElement('option');
    option.value = moedasDisponiveis[i];
    option.text = moedasDisponiveis[i];

    if (moedasDisponiveis[i] !== toCurrencyValue) {
      fromCurrencySelect.add(option);
    }

    if (moedasDisponiveis[i] !== fromCurrencyValue) {
      toCurrencySelect.add(option.cloneNode(true));
    }
  }
  fromCurrencySelect.value = fromCurrencyValue;
  toCurrencySelect.value = toCurrencyValue;
}

document.getElementById('fromCurrency').addEventListener('change', updateCurrencyOptions);
document.getElementById('toCurrency').addEventListener('change', updateCurrencyOptions);

document.getElementById('back-button').addEventListener('click', voltar);


document.getElementById('convert-button').addEventListener('click', function() {
  var amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || amount <= 0) {
    alert('Insira um valor válido para a conversão.');
  } else {
    convertCurrency();
  }
});



/*************************************************************
 * ********************* DISTANCIA **************************
 * **********************************************************/ 


function showDistanceConverter() {
  var name = document.getElementById('name').value;
  if (name.trim() === '') {
    alert('Insira seu nome antes de selecionar um programa.');
    return;
  }
  document.body.style.backgroundImage = "url('https://images5.alphacoders.com/866/866360.jpg')";
  document.body.style.userImage = null;

  document.getElementById('form-container').style.display = 'none';
  document.querySelector('.progdisp').style.display = 'none';
  document.getElementById('converter-buttons').style.display = 'none';
  document.getElementById('distance-program').style.display = 'block';
  document.getElementById('distance-back-button').style.display = 'block';
}


function convertDistance() {
  var name = document.getElementById('name').value;
  var distanceInput = parseFloat(document.getElementById('distanceInput').value);

  if (isNaN(distanceInput) || distanceInput <= 0) {
    alert('Insira uma distância válida em anos-luz.');
    return;
  }

  var selectedUnit = document.getElementById('unitSelector').value;

  var anosLuzEmKm = 9.461e12; 
  var convertedDistance;

  switch (selectedUnit) {
    case 'km':
      convertedDistance = distanceInput * anosLuzEmKm;
      break;
    case 'm':
      convertedDistance = distanceInput * anosLuzEmKm * 1000;
      break;
    case 'cm':
      convertedDistance = distanceInput * anosLuzEmKm * 1000 * 100;
      break;
    default:
      alert('Unidade de conversão inválida.');
      return;
  }

  var resultText = `${name}, ${distanceInput} anos-luz equivale a ${convertedDistance.toFixed(2)} ${selectedUnit}`;
  document.getElementById('convertedDistance').innerHTML = resultText;
}
function voltarDist() {
  document.getElementById('form-container').style.display = 'block';
  document.querySelector('.progdisp').style.display = 'block';
  document.getElementById('converter-buttons').style.display = 'block';
  document.getElementById('converter-program').style.display = 'none';
  document.getElementById('distance-program').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';
  document.getElementById('back-button').style.display = 'none';
  document.getElementById('distance-back-button').style.display = 'none';
  document.body.style.backgroundImage = "url('https://caelum-online-public.s3.amazonaws.com/assets-imersaodev/Background.png')";
  
  
}

/*************************************************************
 * ********************* TEMPERATURA  ************************
 * **********************************************************/ 


function showTemperatureConverter() {
  var name = document.getElementById('name').value;
  if (name.trim() === '') {
    alert('Insira seu nome antes de selecionar um programa.');
    return;
  }

  document.getElementById('form-container').style.display = 'none';
  document.querySelector('.progdisp').style.display = 'none';
  document.getElementById('converter-buttons').style.display = 'none';
  document.getElementById('temperature-program').style.display = 'block';
}

function updateToUnitOptions() {
  var fromUnitSelector = document.getElementById('fromUnitSelector');
  var toUnitSelector = document.getElementById('toUnitSelector');
  var fromUnit = fromUnitSelector.options[fromUnitSelector.selectedIndex].value;
  toUnitSelector.innerHTML = '';

  for (var i = 0; i < fromUnitSelector.options.length; i++) {
    if (fromUnitSelector.options[i].value !== fromUnit) {
      var option = document.createElement('option');
      option.value = fromUnitSelector.options[i].value;
      option.text = fromUnitSelector.options[i].text;
      toUnitSelector.add(option);
    }
  }
}

document.getElementById('fromUnitSelector').addEventListener('change', updateToUnitOptions);
function convertTemperature() {
  var name = document.getElementById('name').value;
  var temperatureInput = parseFloat(document.getElementById('temperatureInput').value);
  var fromUnitSelector = document.getElementById('fromUnitSelector');
  var toUnitSelector = document.getElementById('toUnitSelector');
  var fromUnit = fromUnitSelector.options[fromUnitSelector.selectedIndex].value;
  var toUnit = toUnitSelector.options[toUnitSelector.selectedIndex].value;

  if (isNaN(temperatureInput)) {
    alert('Insira uma temperatura válida.');
    return;
  }

  var convertedTemperature;
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    convertedTemperature = (temperatureInput * 9/5) + 32;
  } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
    convertedTemperature = temperatureInput + 273.15;
  } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    convertedTemperature = (temperatureInput - 32) * 5/9;
  } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
    convertedTemperature = (temperatureInput - 32) * 5/9 + 273.15;
  } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
    convertedTemperature = temperatureInput - 273.15;
  } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
    convertedTemperature = (temperatureInput - 273.15) * 9/5 + 32;
  } else {
    convertedTemperature = temperatureInput; 
  }

  convertedTemperature = convertedTemperature.toFixed(1);
  var resultText = `${name}, ${temperatureInput} ${fromUnit.toUpperCase()} equivale a ${convertedTemperature} ${toUnit.toUpperCase()}`;
  document.getElementById('convertedTemperature').innerText = resultText;
  document.getElementById('convertedTemperature').style.display = 'block';
}

function encerrarPrograma() {
  document.getElementById('form-container').style.display = 'block';
  document.querySelector('.progdisp').style.display = 'block';
  document.getElementById('converter-buttons').style.display = 'block';

  document.getElementById('temperature-program').style.display = 'none';
  document.getElementById('convertedTemperature').style.display = 'none';
}
