import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePickerInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
let timerInterval;

startButton.disabled = true;

const datetimePicker = flatpickr(datetimePickerInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

startButton.addEventListener('click', function () {
  const selectedDate = new Date(datetimePickerInput.value).getTime();
  const currentTime = new Date().getTime();

  if (selectedDate <= currentTime) {
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    return;
  }

  datetimePickerInput.disabled = true;
  startButton.disabled = true;

  timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const remainingTime = selectedDate - now;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      document.querySelector('[data-days]').textContent = '00';
      document.querySelector('[data-hours]').textContent = '00';
      document.querySelector('[data-minutes]').textContent = '00';
      document.querySelector('[data-seconds]').textContent = '00';

      datetimePickerInput.disabled = false;
      startButton.disabled = true;
      iziToast.success({ message: 'Timer completed!', position: 'topRight' });
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
    }
  }, 1000);
});
