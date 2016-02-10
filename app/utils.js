'use strict';

class Utils {
  static getMonthName(index) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return months[index];
  }

  static getDateFormatted(day, month) {
    return `${this.getMonthName(month)} ${day}`;
  }

}

export default Utils;
