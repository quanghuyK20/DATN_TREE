/* eslint-disable no-prototype-builtins */
function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return { ...oldObject, ...newValues }
  }
  
export default updateObject;
  