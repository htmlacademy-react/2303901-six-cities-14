function getRating (value: number) {

  return Math.round(value) * 100 / 5;
}

function setFirstLetter(word:string): string {

  return word.substring(0, 1).toUpperCase() + word.substring(1);
}

export {getRating, setFirstLetter};
