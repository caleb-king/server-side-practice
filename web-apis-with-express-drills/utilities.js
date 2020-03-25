const encrypt = (shift, inputText) => {
  let encryptedMessage = '';
  inputText = inputText.toUpperCase();
  for (let i = 0; i < inputText.length; i++) {
    let newCharCode;
    let currentCharCode = inputText.charCodeAt(i);
    //handle case where currect character is letter
    if (currentCharCode >= 65 && currentCharCode <= 90) {
      newCharCode = currentCharCode + shift;
      if (newCharCode > 90) {
        newCharCode -= 26;
      }
    } 
    //handle case where current character is not a letter
    else {
      newCharCode = currentCharCode;
    }
    encryptedMessage += String.fromCharCode(newCharCode);
  }
  return encryptedMessage;
};

const isNumBtwn1And20 = (input) => {
  const num = parseInt(input);
  if (!num) return false;
  if (num < 1 || num > 20) return false;
  return true;
};

// TESTING isNumBtwn1And20
//    console.log('true', isNumBtwn1And20('7'));
//    console.log('false', isNumBtwn1And20('0'));
//    console.log('false', isNumBtwn1And20('-7'));
//    console.log('true', isNumBtwn1And20('12'));
//    console.log('false', isNumBtwn1And20('twelve'));

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const getRandomLottoNum = () => {
  const newLottoNum = [];
  for (let i = 0; i < 6; i++) {
    newLottoNum.push(`${getRandomInt(1, 21)}`);
  }
  return newLottoNum;
};

const calculateHowManyMatches = (yourNumbers, winningNumbers) => {
  let numMatches = 0;
  for(let i = 0; i < 6; i++) {
    const index = yourNumbers.findIndex(num => num === winningNumbers[i]);
    if (index >= 0) {
      numMatches++;
      yourNumbers.splice(index, 1);
    }
  }
  return numMatches;
};

// TESTING calculateHowManyMatches
//   const yourNumbers = [ 8, 7, 2, 2, 5, 16 ];
//   const winningNumbers = [ 5, 2, 2, 8, 7, 16 ];
//   console.log(calculateHowManyMatches(yourNumbers, winningNumbers));

exports.encrypt = encrypt;
exports.isNumBtwn1And20 = isNumBtwn1And20;
exports.getRandomLottoNum = getRandomLottoNum;
exports.calculateHowManyMatches = calculateHowManyMatches;