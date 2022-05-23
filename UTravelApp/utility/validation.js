//Empty Data
export const isEmptyData = (str) => {
  return str === "" || str === "" || str === undefined
};

//Empty Array
export const EmptyArr = (arr) => {
  return arr.length === 0
};

//Email
export const validateEmail = (email) => {
  try {
    let e = email
    const ValidE = /^[a-zA-Z0-9._$!%^]{3,}@{1}[a-zA-Z]{2,20}[.]{1,}[a-zA-Z]{2,10}$/
    return e.match(ValidE)
  }
  catch (error) {
    console.log(error)
  }
};

//Password
export const validatePassword = (password) => {
  try {
    const ValidP = password
    return ValidP.length > 5 && ValidP.length < 30
  }
  catch (error) {
    console.log(error)
  }
};

//Confirm Password
export const ConfirmPassword = (password, cpassword) => {
  try {
    return cpassword.match(password)
  }
  catch (error) {
    console.log(error)
  }
};

//User Name
export const validateUserName = (name) => {
  try {
    const ValidN = name
    return ValidN.length > 3 && ValidN.length < 30
  }
  catch (error) {
    console.log(error)
  }
};

//business Name
export const validateBusinessName = (business) => {
  try {
    const ValidB = business
    return ValidB.length > 5 && ValidB.length < 50
  }
  catch (error) {
    console.log(error)
  }
};

//owner Name
export const validateOwnerName = (ownerName) => {
  try {
    const ValidO = ownerName
    return ValidO.length > 3 && ValidO.length < 30
  }
  catch (error) {
    console.log(error)
  }
};
//Add default Image
export const defaultImage = (image, userImage) => {
  if ((image == null || image == '') && (userImage == null || userImage == '')) {
    alert("default");
    image = 'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png';
    return image;
  }
  return image || userImage
}
//Attraction default Image
export const AttractiondefaultImage = (image) => {
  if (image == null || image == '') {
    alert("default");
    image = 'https://hatpakha.com/wp-content/uploads/2019/09/no-image.jpg';
    return image;
  }
  return image
}

export const checkLength10 = (str) => {
  try {
    const Valid = str
    return Valid.length > 3 && Valid.length < 10
  }
  catch (error) {
    console.log(error)
  }
}

export const checkLength20 = (str) => {
  try {
    const Valid = str
    return Valid.length > 3 && Valid.length < 20
  }
  catch (error) {
    console.log(error)
  }
};

export const checkLength30 = (str) => {
  try {
    const Valid = str
    return Valid.length > 3 && Valid.length < 30
  }
  catch (error) {
    console.log(error)
  }
};

export const checkLength40 = (str) => {
  try {
    const Valid = str
    return Valid.length > 3 && Valid.length < 40
  }
  catch (error) {
    console.log(error)
  }
};

export const checkLength100 = (str) => {
  try {
    const Valid = str
    return Valid.length > 3 && Valid.length < 100
  }
  catch (error) {
    console.log(error)
  }
};

export const FormatPrice = (str) => {
  try {
    let s = str
    const ValidS = /^([1-9][0-9]{1,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{2})$/
    return s.match(ValidS)
  }
  catch (error) {
    console.log(error)
  }
}

export const FormatTime = (str) => {
  try {
    let s = str
    const ValidS = /^[0-1][0-9]|[0-2][0-3]:[0-5][0-9]$/
    return s.match(ValidS)
  }
  catch (error) {
    console.log(error)
  }
}