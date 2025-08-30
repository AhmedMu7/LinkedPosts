import axios from "axios";

export async function sendLoginData(userdata) {
  try {
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      userdata
    );
    return data
    
  } catch (error) {

    
    return error.response.data

  }
}
