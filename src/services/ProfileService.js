import axios from "axios";

export async function getProfileData(){

    
    try {

        const {data} = await axios.get('https://linked-posts.routemisr.com/users/profile-data' , {
            headers:{

                token : localStorage.getItem('token')

            }
        })

        return data
        

    } catch (error) {
        
        return error.response.data
    }



}


export async function uploadProfilePicApi(formdata) {
  try {
    const { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formdata,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data
  } catch (error) {
    return error.response.data
  }
}