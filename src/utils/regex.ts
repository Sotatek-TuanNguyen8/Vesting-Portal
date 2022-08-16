export const isNotNumber =
  /^(?=.*[a-zA-Z])(?=.*?[#?!_@$%^&*-])[a-zA-Z#?!_@$%^&*-]{8,}$/g;
export const isNotUpperCase =
  /^(?=.*[a-z])(?=.*\d)(?=.*?[#?!_@$%^&*-])[a-z\d#?!_@$%^&*-]{8,}$/g;
export const isNotLowerCase =
  /^(?=.*[A-Z])(?=.*\d)(?=.*?[#?!_@$%^&*-])[A-Z\d#?!_@$%^&*-]{8,}$/g;
export const isNotSpecialCharacters =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
export const standardRules =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*?[#?!_@$%^&*-])[a-zA-Z\d#?!_@$%^&*-]{8,}$/g;
