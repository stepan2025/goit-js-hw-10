import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

console.log('snackbar');

const options = {
  enableTime: true, // Дозволяє вибір часу
  time_24hr: true, // Встановлює 24-годинний формат часу
  defaultDate: new Date(), // Встановлює поточну дату як значення за замовчуванням
  minuteIncrement: 1, // Крок вибору хвилин (кожні 1 хвилина)
  onClose(selectedDates) {
    // Колбек, який викликається після закриття календаря
    console.log(selectedDates[0]); // Виводить обрану дату та час
  },
};

// Ініціалізація flatpickr
flatpickr('#datetime-picker', options);
