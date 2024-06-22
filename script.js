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

    const targetUrl = '/.netlify/functions/rsvp';

    fetch(targetUrl, {
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

