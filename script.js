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

    fetch('https://script.google.com/macros/s/AKfycbynXh2W6ZRGnW0jnjK_etUEbi-0l0DTaNuFunAK_RsfSn9UmNxCvjnVPuKg_nZ18Gxf/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('RSVP submitted successfully!');
        } else {
            alert('There was an error submitting your RSVP. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
