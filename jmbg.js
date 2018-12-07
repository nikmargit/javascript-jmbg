/**
 * Checks if JMBG is valid
 *
 * @param {number} first The JMBG
 *
 * @returns {boolean}
 */

export const isValidJMBG = jmbg => {
  if (jmbg.length === 13) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const arrJMBG = jmbg.split("");
    //check_birthyear
    let birthYear = arrJMBG.slice(4, 7).join("");
    if (birthYear[0] === "0") {
      birthYear = Number(birthYear) + 2000;
    } else if (birthYear[0] === "9") {
      birthYear = Number(birthYear) + 1000;
    } else {
      return false;
    }
    //check month
    const birthMonth = arrJMBG.slice(2, 4).join("");
    if (birthMonth > 12 || birthMonth < 1) {
      return false;
    }
    //check leap year and set number of days in february
    if (
      birthYear % 4 === 0 &&
      (birthYear % 100 !== 0 || birthYear % 400 === 0)
    ) {
      // prestupna godina
      daysInMonth[1] = 29;
    }

    //check if birth date is valid
    const birthDate = arrJMBG.slice(0, 2).join("");
    if (birthDate > daysInMonth[birthMonth - 1] || birthDate < 1) {
      return false;
    }

    //check control number

    let controlNumber =
      11 -
      ((7 * (Number(arrJMBG[0]) + Number(arrJMBG[6])) +
        6 * (Number(arrJMBG[1]) + Number(arrJMBG[7])) +
        5 * (Number(arrJMBG[2]) + Number(arrJMBG[8])) +
        4 * (Number(arrJMBG[3]) + Number(arrJMBG[9])) +
        3 * (Number(arrJMBG[4]) + Number(arrJMBG[10])) +
        2 * (Number(arrJMBG[5]) + Number(arrJMBG[11]))) %
        11);
    if (controlNumber > 9) controlNumber = 0;

    if (controlNumber !== Number(arrJMBG[12])) {
      return false;
    }

    return true;
  }
};