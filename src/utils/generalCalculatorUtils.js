const getBalanceParentheses = (equation) => {
  if (Array.isArray(equation)) equation = equation.join("");

  return equation
    .split("")
    .reduce((acc, curr) => {
      if (curr == "(") acc.push(")");
      else if (curr == ")") acc.pop();
      return acc;
    }, [])
    .join("");
};

const convertEquationToDeg = (equation) => {
  if (Array.isArray(equation)) equation = equation.join();
  return equation.replace(
    /\b(sin|cos|tan|sin⁻¹|cos⁻¹|tan⁻¹)\(((?!.*\* *deg)[^()]+?)\)/g,
    (_, fn, expr) => {
      return `${fn}(${expr} deg)`;
    }
  );
};

export { getBalanceParentheses, convertEquationToDeg };
