import axios from "axios";

export async function getPosts(pageNum) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts?page=${pageNum}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
        params:{

          sort:'-createdAt'
        }
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePostApi(postid) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + postid,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createCommentApi(commentContent, postid) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content: commentContent,
        post: postid,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data;
  }
}





export async function updateCommentApi(commentContent, commentid) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentid}`,
      {
        content: commentContent
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;
  } catch (error) {
    return error.response.data;
  }
}




export async function deleteCommentApi(commentid) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentid}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
}





export async function createPostApi(formdata){


  try {

    const {data} = await axios.post('https://linked-posts.routemisr.com/posts' , formdata , {

      headers : {

        token : localStorage.getItem('token')
      }

    })

    return data
    
    
  } catch (error) {
    
     return error.response.data;
     

  }


}


export async function getUserPostsApi(userId) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        }
      }
    );

    return data;
  } catch (error) {
    return error.response.data
  }
}




export async function updatePostsApi(formdata , postid) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postid}`, formdata ,  
      {
        headers: {
          token: localStorage.getItem("token"),
        }
      }
    );

    return data;
  } catch (error) {
    return error
  }
}


export async function deletePostsApi(postid) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postid}` ,  
      {
        headers: {
          token: localStorage.getItem("token"),
        }
      }
    );

    return data;
  } catch (error) {
    return error
  }
}


export async function getPostComments(postid) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${postid}/comments`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return data
    
    
  } catch (error) {
    return error;
  }
}


