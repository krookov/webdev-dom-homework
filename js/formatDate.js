export function formatDateTime(d) {

    const currentDate = new Date(d);
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat('ru-RU', options);
    const formattedDate = formatter.format(currentDate);
    const [datePart, timePart] = formattedDate.split(', ');
    const [date] = datePart.split('/');
    const [hour, minute] = timePart.split(':');

    return `${date} ${hour}:${minute}`;
}