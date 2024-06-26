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

    function allowScroll() {
        document.body.style.overflow = 'auto';
    }

    function preventScrolling() {
        document.body.style.overflow = 'hidden';
    }

    window.addEventListener('scroll', function (e) {
        if (initialLoad) {
            e.preventDefault();

            const scrollPosition = window.scrollY;

            if (scrollPosition < 200) {
                preventScrolling();
                // Move banners apart and maintain full opacity
                const bannerWidth = Math.max(50 - scrollPosition / 4, 0) + 'vw'; // Adjust this to control how much the banners move apart
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
document.addEventListener("DOMContentLoaded", function() {
    const panels = document.querySelectorAll('.timeline-panel');
    
    panels.forEach(panel => {
        panel.addEventListener('mouseover', function() {
            panel.style.transform = 'scale(1.05)';
            panel.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });

        panel.addEventListener('mouseout', function() {
            panel.style.transform = 'scale(1)';
            panel.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Set the date we're counting down to
    const countDownDate = new Date("Dec 15, 2024 15:00:00").getTime();

    // Update the countdown every 1 second
    const countdownFunction = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the countdown date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in the respective elements
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-timer").innerHTML = "The Wedding is Here!";
        }
    }, 1000);

    // Spark effect logic
    document.querySelectorAll('.time-box').forEach(box => {
        box.addEventListener('mouseover', function(event) {
            createSparks(event, box);
        });
    });

    function createSparks(event, element) {
        for (let i = 0; i < 30; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            spark.style.left = `${event.clientX - element.getBoundingClientRect().left}px`;
            spark.style.top = `${event.clientY - element.getBoundingClientRect().top}px`;
            element.querySelector('.spark-container').appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }
    }
});



