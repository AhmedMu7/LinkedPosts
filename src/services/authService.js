import axios from "axios";

export async function sendRegisterData(userdata) {
  try {
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      userdata
    );
    return data
    
  } catch (error) {

    
    return error.response.data

  }
}
