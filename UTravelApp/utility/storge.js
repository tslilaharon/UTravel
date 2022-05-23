import AsyncStorage from '@react-native-async-storage/async-storage';
//base url
export const url = "http://proj7.shenkar-tech.co.il/api"

// export const url = "http://localhost:5000/api"

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  }
  catch (error) {
    console.log(error)
  }
}
export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value;
    }
    else return false;
  } catch (error) {
    console.log(error)
  }
}
export const _storeItemData = async (key, value, qty) => {
  try {
    let prevCart = await AsyncStorage.getItem(key)
    let currentCart = prevCart ? JSON.parse(prevCart) : [];
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].Attraction_Id == value.Attraction_Id) {
        currentCart[i].qty++
        await AsyncStorage.setItem(key, JSON.stringify(currentCart))
        return
      }
    }
    currentCart.push(
      {
        ...value,
        qty: qty
      }
    )
    await AsyncStorage.setItem(key, JSON.stringify(currentCart))
  }
  catch (error) {
    console.log(error)
  }
}
export const _updateItemData = async (key, value, qty) => {
  try {
    let prevCart = await AsyncStorage.getItem(key)
    let currentCart = prevCart ? JSON.parse(prevCart) : [];
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].Attraction_Id == value.Attraction_Id) {
        currentCart[i].qty = qty
        await AsyncStorage.setItem(key, JSON.stringify(currentCart))
        return
      }
    }
    await AsyncStorage.setItem(key, JSON.stringify(currentCart))
  }
  catch (error) {
    console.log(error)
  }
}
export const _removeItemData = async (key, value) => {
  try {
    let prevCart = await AsyncStorage.getItem(key)
    let currentCart = prevCart ? JSON.parse(prevCart) : [];
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].Attraction_Id == value.Attraction_Id) {
        currentCart.splice(i, 1)
        await AsyncStorage.setItem(key, JSON.stringify(currentCart))
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}
export const _removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  }
  catch (error) {
    console.log(error)
  }
}
export const _clearData = async () => {
  AsyncStorage.clear();
  alert("clear Async Storage ")
}