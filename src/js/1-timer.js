import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.getElementById('startBtn').disabled = true;
    } else {
      document.getElementById('startBtn').disabled = false;
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

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const datetimePicker = document.querySelector('#datetime-picker');

  if (startButton && datetimePicker) {
    flatpickr(datetimePicker, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        const userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
          iziToast.error({
            message: 'Please choose a date in the future',
          });
          startButton.disabled = true;
        } else {
          startButton.disabled = false;
        }
      },
    });

    startButton.addEventListener('click', function () {
      const selectedDate = datetimePicker.value;
      const timerTarget = new Date(selectedDate).getTime();
      const timerInterval = setInterval(function () {
        const currentTime = new Date().getTime();
        const distance = timerTarget - currentTime;

        if (distance < 0) {
          clearInterval(timerInterval);
          document.querySelector('[data-days]').textContent = '00';
          document.querySelector('[data-hours]').textContent = '00';
          document.querySelector('[data-minutes]').textContent = '00';
          document.querySelector('[data-seconds]').textContent = '00';
          iziToast.success({
            message: 'Timer completed!',
          });
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          document.querySelector('[data-days]').textContent = String(
            days
          ).padStart(2, '0');
          document.querySelector('[data-hours]').textContent = String(
            hours
          ).padStart(2, '0');
          document.querySelector('[data-minutes]').textContent = String(
            minutes
          ).padStart(2, '0');
          document.querySelector('[data-seconds]').textContent = String(
            seconds
          ).padStart(2, '0');
        }
      }, 1000);
    });
  } else {
    console.error('Не знайдено елементи для ініціалізації');
  }
});
