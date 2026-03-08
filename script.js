document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const cardsContainer = document.getElementById('cards-container');

    const today = new Date();

    // Generate 7 days of cards starting from today
    const generateCards = () => {
        for (let i = 0; i < 7; i++) {
            const cardDate = new Date(today);
            cardDate.setDate(today.getDate() + i);

            const card = document.createElement('div');
            card.className = 'card';

            const cardTitle = document.createElement('h3');
            cardTitle.textContent = cardDate.toDateString();
            card.appendChild(cardTitle);

            const habitList = document.createElement('ul');
            habitList.className = 'habit-list';
            card.appendChild(habitList);

            cardsContainer.appendChild(card);
        }
    };

    // Load habits from localStorage
    const loadHabits = () => {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        document.querySelectorAll('.habit-list').forEach((habitList, index) => {
            habits.forEach(habit => addHabitToDOM(habitList, habit.text, habit.completed, habit.streak, habit.lastCompleted));
        });
    };

    // Save habits to localStorage
    const saveHabits = () => {
        const habits = [];
        document.querySelectorAll('.habit-list li').forEach(li => {
            habits.push({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('input[type="checkbox"]').checked,
                streak: parseInt(li.querySelector('.streak').textContent, 10),
                lastCompleted: li.dataset.lastCompleted
            });
        });
        localStorage.setItem('habits', JSON.stringify(habits));
    };

    // Add habit to DOM
    const addHabitToDOM = (habitList, text, completed = false, streak = 0, lastCompleted = null) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (li.dataset.lastCompleted !== today.toDateString()) {
                    li.dataset.lastCompleted = today.toDateString();
                    li.querySelector('.streak').textContent = streak + 1;
                }
            } else {
                li.querySelector('.streak').textContent = streak;
            }
            saveHabits();
        });
        li.appendChild(checkbox);

        const streakCounter = document.createElement('span');
        streakCounter.className = 'streak';
        streakCounter.textContent = streak;
        li.appendChild(streakCounter);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveHabits();
        });
        li.appendChild(deleteButton);

        li.dataset.lastCompleted = lastCompleted || '';

        if (completed) {
            li.classList.add('completed');
        }

        habitList.appendChild(li);
    };

    // Handle form submission
    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const habitText = habitInput.value.trim();
        if (habitText) {
            document.querySelectorAll('.habit-list').forEach(habitList => {
                addHabitToDOM(habitList, habitText);
            });
            saveHabits();
            habitInput.value = '';
        }
    });

    generateCards();
    loadHabits();
});