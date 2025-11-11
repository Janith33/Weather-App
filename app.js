const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('Pune');
	$('#city-input').on('keydown', function (e) {
		if (e.key === 'Enter') {
			$('#city-input-btn').click();
		}
	});
	$('#city-input-btn').on('click', function () {
		const val = $('#city-input').val();
		weatherFn(val);
	});
});

async function weatherFn(cName) {
	const name = (cName || '').toString().trim();
	$('#error').text('');
	if (!name) {
		$('#weather-info').hide();
		$('#error').text('Please enter a city name.');
		return;
	}
	const btn = $('#city-input-btn');
	const prevText = btn.text();
	btn.prop('disabled', true).text('Loading...');
	const temp = `${url}?q=${encodeURIComponent(name)}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			$('#weather-info').hide();
			$('#error').text('City not found. Please try again.');
		}
	} catch (error) {
		$('#weather-info').hide();
		$('#error').text('Unable to fetch weather. Check your connection and try again.');
	} finally {
		btn.prop('disabled', false).text(prevText);
	}
}

function weatherShowFn(data) {
	$('#city-name').text(data.name);
	$('#date').text(moment().
		format('MMMM Do YYYY, h:mm:ss a'));
	$('#temperature').
		html(`${data.main.temp}°C`);
	$('#description').
		text(data.weather[0].description);
	$('#wind-speed').
		html(`Wind Speed: ${data.wind.speed} m/s`);
	const icon = (data.weather && data.weather[0] && data.weather[0].icon) ? data.weather[0].icon : '01d';
	$('#weather-icon').
		attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
	$('#weather-info').fadeIn();
}
