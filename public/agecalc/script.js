
const calculateButton = document.querySelector('.btn-convert');   

const resultDay = document.querySelector('#day');
const resultMonth = document.querySelector('#month');
const resultYear = document.querySelector('#year');

const inputDay = document.querySelector('#input-day');
const inputMonth = document.querySelector('#input-month');
const inputYear = document.querySelector('#input-year');

const calculateAge = () => {
    const day = inputDay.value;
    const month = inputMonth.value;
    const year = inputYear.value;

    if(month > 12 || month < 1) {
        alert('Invalid month!');
        return;
    }

    if(day > 31 || day < 1) {
        alert('Invalid day!');a
        return;
    }

    if(year > 2023 || year < 0) {
        alert('Invalid year!');
        return;
    }

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();

    let age = currentYear - year;
    const monthDiff = currentMonth - month;
    const dayDiff = currentDay - day;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    resultDay.textContent = day;
    resultMonth.textContent = month;
    resultYear.textContent = age;
}





calculateButton.addEventListener('click', calculateAge);