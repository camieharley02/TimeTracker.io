const timeframe = document.querySelector('.card-container');
const buttons = document.querySelectorAll('.jcard-content button');
let timeTrackingData = [];
let selectedTimeframe = 'weekly';

async function fetchData() {
    try {
        const response = await fetch('data.json');
        timeTrackingData = (await response.json()).Tracks;
        createCardElement();
        updateTime(selectedTimeframe);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createCardElement() {
    const cardElements = timeTrackingData.map(item => {
        const { title, timeframes } = item;
        const { current, previous } = timeframes[selectedTimeframe];

        return `
    <div class="card">
      <div class="card-content">
        <div class="content-wrapper">
          <span>${title}</span>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        <div class="hours">
            <h1>0hrs</h1>
            <p></p>
        </div>
      </div>       
    </div>
        `;
    });

    timeframe.innerHTML = cardElements.join('');
}

function updateTime(timeframe) {
    const timePeriodText = {
        daily: 'Yesterday',
        weekly: 'Last week',
        monthly: 'Last month',
    }[timeframe];
    document.querySelectorAll('.card').forEach((card, i) => {
        const { current, previous, timeframe: cardTimeframe } = timeTrackingData[i].timeframes[timeframe];
        const [titleElement, timeElement, previousElement] = card.querySelectorAll('span, h1, p');

        titleElement.innerHTML = `${titleElement.textContent}`;
        timeElement.textContent = `${current}hrs`;
        previousElement.textContent = `${timePeriodText} - ${previous}hrs`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            selectedTimeframe = button.id;
            updateTime(selectedTimeframe);

            // Remove 'active' class from all buttons
            buttons.forEach(b => b.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');
        });
    });
    fetchData();
});
 