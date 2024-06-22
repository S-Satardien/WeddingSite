document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const attendance = document.getElementById('attendance').value;

    const data = {
        name: name,
        email: email,
        attendance: attendance
    };

    // Check if running locally or on a production server
    const isLocal = window.location.hostname === 'localhost';
    const proxyUrl = isLocal ? 'http://localhost:8080/' : '';
    const targetUrl = 'https://script.google.com/macros/s/AKfycbynXh2W6ZRGnW0jnjK_etUEbi-0l0DTaNuFunAK_RsfSn9UmNxCvjnVPuKg_nZ18Gxf/exec';

    fetch(proxyUrl + targetUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the response data
        if (data.result === 'success') {
            alert('RSVP submitted successfully!');
        } else {
            alert('There was an error submitting your RSVP. Please try again.');
        }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

