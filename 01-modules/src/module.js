export function valid(email) {
  const regEx = /^[a-zA-Z0-9]*\.(mm)[at](-)[bm][0-9]{4}@(fh-salzburg.ac.at)$/g;
  return regEx.test(email);
}

export function degreeProgram(email) {
  const regEx = /[a-z]{3}(?=-)/g;
  return regEx.exec(email)[0].toUpperCase();
}

export function level(email) {
  const regEx = /(b|m)(?=[0-9]{4}@fh-salzburg.ac.at)/g;
  return regEx.exec(email)[0] == "b" ? "BA" : "MA";
}

export function graduationYear(email) {
  let program = level(email);
  const regExYear = /[0-9]{4}(?=@fh-salzburg.ac.at)/g;
  let start = parseInt(regExYear.exec(email)[0]);

  return start + (program == "BA" ? 3 : 2);
}
