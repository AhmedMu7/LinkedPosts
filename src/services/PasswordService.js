import axios from "axios";

export async function changePasswordApi(password) {
  try {

    const {data} = await axios.patch('https://linked-posts.routemisr.com/users/change-password', password , {

        headers:{

            token : localStorage.getItem('token')

        }


    })

    return data


  } catch (error) {

    return error.response.data

  }
}
