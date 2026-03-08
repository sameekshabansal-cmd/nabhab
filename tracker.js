document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');

    let startDate = new Date();

    // Adjust startDate to always begin from today
    startDate.setHours(0, 0, 0, 0);

    // Calculate the end date for the current week (next Sunday)
    const calculateEndDate = (start) => {
        const endDate = new Date(start);
        endDate.setDate(start.getDate() + (7 - start.getDay())); // Ensure it ends on Sunday
        return endDate;
    };

    // Generate cards for a given date range
    const generateCards = (start, end) => {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];

        const currentDate = new Date(start); // Create a copy of the start date

        while (currentDate <= end) {
            const cardDate = new Date(currentDate);

            const card = document.createElement('div');
            card.className = 'card';

            const cardTitle = document.createElement('h3');
            cardTitle.textContent = cardDate.toDateString();
            card.appendChild(cardTitle);

            const habitList = document.createElement('ul');
            habitList.className = 'habit-list';

            habits.forEach(habit => {
                const li = document.createElement('li');

                const span = document.createElement('span');
                span.textContent = habit.text;
                li.appendChild(span);

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                li.appendChild(checkbox);

                habitList.appendChild(li);
            });

            card.appendChild(habitList);
            cardsContainer.appendChild(card);

            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
    };

    // Add button to load next set of dates
    const addNextDaysButton = () => {
        const nextDaysButton = document.createElement('button');
        nextDaysButton.textContent = 'Load Next Week';
        nextDaysButton.className = 'button';
        nextDaysButton.addEventListener('click', () => {
            const nextStartDate = new Date(startDate);
            nextStartDate.setDate(startDate.getDate() + 7);

            const nextEndDate = calculateEndDate(nextStartDate);
            generateCards(nextStartDate, nextEndDate);

            startDate = nextStartDate; // Update the startDate for subsequent weeks
        });
        cardsContainer.appendChild(nextDaysButton);
    };

    const endDate = calculateEndDate(startDate);
    generateCards(startDate, endDate);
    addNextDaysButton();
});