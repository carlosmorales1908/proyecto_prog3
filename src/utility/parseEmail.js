const parseEmail = (email) => {
  let index = email.indexOf("@");
  let antesDelArroba = email.substring(0, index);
  let asteriscos = "*".repeat(antesDelArroba.length);
  let resultado = asteriscos + email.substring(index);
  return resultado;
};
export default parseEmail;
