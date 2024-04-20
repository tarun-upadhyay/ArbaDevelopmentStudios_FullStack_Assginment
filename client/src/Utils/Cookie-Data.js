export async function cookieData(validationMode, data) {
  if (validationMode === "auth") {
    try {
      const response = await fetch(`/session`);
      const responseData = await response.json();
      if (responseData.token) return responseData;
    } catch (error) {
        console.error(error,"cookie-datafun")
      return false;
    }
  } else if (validationMode === "userDetail" && data) {
    localStorage.setItem("loggedUser", JSON.stringify(data));
  } else if (validationMode === "getUserDetail") {
    const storedObject = localStorage.getItem("loggedUser");
    const parsedObject = JSON.parse(storedObject);

    return parsedObject;
  }
}
