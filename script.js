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
                        console.log("Response data:", data); // Log the response data
                        if (data.result === 'success') {
                            alert('RSVP submitted successfully!');
                        } else {
                            if (data.error) {
                                alert(data.error);
                            } else {
                                alert('There was an error submitting your RSVP. Please try again.');
                            }
                        }
                    })
                    .catch(error => {
                        console.error('There was a problem with your fetch operation:', error);
                        alert('There was a problem with your fetch operation: ' + error.message);
                    });
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

document.addEventListener('DOMContentLoaded', function () {
    let bannersMoved = false;
    let initialLoad = true;

    function preventScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function allowScroll() {
        document.body.style.overflow = 'auto';
    }

    function preventScrolling() {
        document.body.style.overflow = 'hidden';
    }

    window.addEventListener('scroll', function (e) {
        if (initialLoad) {
            e.preventDefault();

            var scrollPosition = window.scrollY;

            if (scrollPosition < 200) {
                preventScrolling();
                // Move banners apart and maintain full opacity
                var bannerWidth = Math.max(50 - scrollPosition / 4, 0) + 'vw'; // Adjust this to control how much the banners move apart
                document.body.style.setProperty('--banner-width', bannerWidth);
                document.body.style.setProperty('--banner-opacity', '1');
            } else {
                // Fix banners to the sides and set opacity to 0.8
                document.body.style.setProperty('--banner-width', '200px');
                document.body.style.setProperty('--banner-opacity', '0.8');
                document.body.style.setProperty('--banner-zindex', '1'); // Lower the z-index to stay behind the footer
                bannersMoved = true;
                initialLoad = false; // Ensure banners stay fixed after the first scroll
                allowScroll();
                window.scrollTo(0, 0); // Reset scroll position
            }
        }
    });
});



