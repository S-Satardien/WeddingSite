// Bootstrap form validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();

                    const firstName = document.getElementById('firstname').value;
                    const lastName = document.getElementById('lastname').value;
                    const attendance = document.getElementById('attendance').value;
                    const dietary = document.getElementById('dietary').value;

                    const data = {
                        firstName: firstName,
                        lastName: lastName,
                        attendance: attendance,
                        dietary: dietary
                    };

                    console.log("Data being sent:", data); // Log data for debugging

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
                            if (data.error && data.error.includes("already RSVP'd")) {
                                alert(data.error);
                            } else {
                                alert('There was an error submitting your RSVP. Please try again.');
                            }
                        }
                    })
                    .catch(error => {
                        console.error('There was a problem with your fetch operation:', error);
                    });
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();



