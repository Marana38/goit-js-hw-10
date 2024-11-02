import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('button[data-start]');
const dateInput = document.getElementById('datetime-picker');
const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
};

let userSelectedDate;
let timerId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({ title: "Error", message: "Please choose a date in the future" });
            startButton.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    }
};

flatpickr(dateInput, options);

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    dateInput.disabled = true;
    timerId = setInterval(() => updateTimer(), 1000);
});

function updateTimer() {
    const timeRemaining = userSelectedDate - new Date();
    if (timeRemaining <= 0) {
        clearInterval(timerId);
        startButton.disabled = false;
        dateInput.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
