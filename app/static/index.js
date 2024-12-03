
function createRowOfStars(checked) {
    let starsWrapper = document.createElement('div');
    starsWrapper.className = "star-rating";

    for(let i = 0; i < 5; i++) {
        let star = document.createElement('span');
        star.className = 'star'
        if(checked > 0) {
            star.classList.add('checked')
            checked--;
        }
        starsWrapper.appendChild(star);
    }
    return starsWrapper
}

function createProbList(probs) {
    if(!probs) {
        probs = [0, 0, 0, 0, 0];
    }

    // Round probabilities and pad with zeros for consistent length
    for(let i = 0; i < probs.length; i++) {
        //Round probability to 3 decimal places
        let probValue = probs[i];
        probValue = Math.round(probValue * 1000) / 1000;

        if(probValue.toString().length < 5) {
            let str = probValue.toFixed(3);
            let num = str.padEnd(5, '0');
            probs[i] = num;
        }
    }

    let probList = document.getElementById('prob-list');
    probList.innerHTML = '';
    for(let i = 0; i < 5; i++) {
        let probListItem = document.createElement('div');
        probListItem.className = 'prob-list-item';

        let prob = document.createElement('span');
        prob.className = "prob"

        prob.innerText = probs[i];

        probListItem.appendChild(prob);
        probListItem.appendChild(createRowOfStars(i+1));
        probList.appendChild(probListItem);
    }
}

function createProbChart(probs) {
    if(!probs) {
        probs = [0.2, 0.2, 0.2, 0.2, 0.2];
    }

    let probChartCanvas = document.getElementById('prob-chart');
    let ctx = probChartCanvas.getContext('2d');

    if(ctx.chart) {
        ctx.chart.destroy();
    }

    ctx.chart = new Chart(ctx, {
        type: 'pie',
            data: {
                labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
                datasets: [{
                    label: 'Review Data',
                    data: probs,
                    backgroundColor: [
                        'rgb(255,0,0, 0.7)',
                        'rgb(243,103,5, 0.7)',
                        'rgb(250,220,2, 0.7)',
                        'rgb(164,250,2, 0.7)',
                        'rgba(2,250,8, 0.7)'
                    ],
                    borderColor: [
                        'rgb(255,0,0)',
                        'rgb(243,103,5)',
                        'rgb(250,220,2)',
                        'rgb(164,250,2)',
                        'rgba(2,250,8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                aspectRatio: 1.9,
                plugins: {
                    legend: {
                        position: 'right',
                        display: false,
                        labels: {
                            boxWidth: 8,
                            boxHeight: 8
                        }

                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return "Probability: " + tooltipItem.raw;
                            }
                        }
                    }
                }
            }

    });

}



function onPredictionSubmit() {

    // Change Results header from "Results" -> "Loading..."
    let resultsHeader = document.getElementById('results-header-title');
    resultsHeader.innerText = "Loading...";

    let review = document.getElementById('review-input-area').value;
    console.log(review);

    let data = { reviewText: review };
    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
        handlePredictionResults(data.rating, data.probs);
    });
}

function handlePredictionResults(rating, probs) {
    let mainStars = document.getElementById('main-stars').children
    for(let i = 0; i < mainStars.length; i++) {
        let star = mainStars[i];
        rating-- > 0? star.className = "star checked" : star.className = "star";
    }

    // Handle the probability section
    createProbList(probs);
    createProbChart(probs);

    // Change Results header from "Loading..." -> "Results"
    let resultsHeader = document.getElementById('results-header-title');
    resultsHeader.innerText = "Results";

    // Scroll to results when they are received
    document.getElementById('main').scrollIntoView({
        behavior: "smooth"
    });
}

function init() {
    createProbList();
    createProbChart();
}

init();