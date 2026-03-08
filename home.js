document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const habitList = document.getElementById('habit-list');

    // Load habits from localStorage
    const loadHabits = () => {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => addHabitToDOM(habit.text));
    };

    // Save habits to localStorage
    const saveHabits = () => {
        const habits = [];
        document.querySelectorAll('#habit-list li').forEach(li => {
            habits.push({ text: li.querySelector('span').textContent });
        });
        localStorage.setItem('habits', JSON.stringify(habits));
    };

    // Add habit to DOM
    const addHabitToDOM = (text) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveHabits();
        });
        li.appendChild(deleteButton);

        habitList.appendChild(li);
    };

    // Handle form submission
    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const habitText = habitInput.value.trim();
        if (habitText) {
            addHabitToDOM(habitText);
            saveHabits();
            habitInput.value = '';
        }
    });

    loadHabits();
});