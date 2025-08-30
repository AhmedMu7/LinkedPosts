import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../Schema/ChangePasswordSchema";
import { changePasswordApi } from "../services/PasswordService";
import { p } from "framer-motion/client";
import LoadingScreen from "../Components/LoadingScreen";
import ProfileLoadingScreen from "../Components/ProfileLoadingScreen";
import { useNavigate } from "react-router-dom";
import {
  getProfileData,
  uploadProfilePicApi,
} from "../services/ProfileService";
import PostCard from "../Components/Postcard";
import { getUserPostsApi } from "../services/PostService";

export default function ProfilePage() {
  const { Profiledata, setProfiledata, setIsLoggedin } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [urlprofilePicture, setUrlProfilePicture] = useState(null);
  const [userPosts, setUserPosts] = useState([])

  const navigate = useNavigate();

  function getAge() {
    const useryear = new Date(Profiledata.dateOfBirth).getFullYear();
    const todayyear = new Date().getFullYear();
    const Age = todayyear - useryear;
    return Age;
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },

    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function changePassword(data) {
    setIsLoading(true);
    const response = await changePasswordApi(data);
    setIsLoading(false);

    if (response.message) {
      setIsChanged(true);
      localStorage.removeItem("token");
      setProfiledata(null);
      setIsLoggedin(null);
      navigate("/login");
    } else {
      setIsChanged(response.error);
    }
  }

  function handlePicture(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file); 
      setUrlProfilePicture(URL.createObjectURL(file)); 
    }
    e.target.value = "";
  }

  async function uploadProfilePic() {
    if (!profilePicture) return;

    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("photo", profilePicture); 

    const response = await uploadProfilePicApi(formdata);

    if (response.message) {
      await getProfileData();
      setProfilePicture(null);
    }

    setIsLoading(false);
  }

  useEffect(() => {

  }, [profilePicture]);


  async function getUserPosts(){
    
    setIsPostsLoading(true)
    
    const response = await getUserPostsApi(Profiledata._id)
    
    if(response.message){
      
      setUserPosts(response.posts)
      
    }
    setIsPostsLoading(false)
  }

  useEffect(()=>{

       if (Profiledata && Profiledata._id) {
        getUserPosts();
  }

  },[Profiledata])

  return (
    <>
      {Profiledata ? (
        <div className=" bg-white sm:w-170 mx-auto flex gap-6 items-center px-5 py-5 rounded-2xl shadow-2xl relative mb-15">
          <div>
            <img
              src={urlprofilePicture || Profiledata.photo}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full"
            />
          </div>

          <div>
            <h4 className=" text-2xl">{Profiledata.name}</h4>
            <h4 className=" text-2xl">{getAge()} y/o</h4>
            <h4 className=" text-2xl">{Profiledata.gender}</h4>

            <div className="flex space-x-2  mt-3">
              <button className="hover:cursor-pointer hover:bg-gray-200 duration-200 py-2 px-4 rounded-xl text-small bg-gray-300 outline-0" onClick={onOpen}>
                
                Change Password
              </button>

              <label className=" hover:cursor-pointer hover:bg-gray-200 duration-200 py-2 px-4 rounded-xl text-small bg-gray-300 block outline-0">
                <input
                  onChange={handlePicture}
                  type="file"
                  className=" hidden"
                />
                <span>Change photo</span>
              </label>

              {profilePicture && (
                <Button isLoading={isLoading} onPress={uploadProfilePic} color="warning">
                  Save Changes
                </Button>
              )}
            </div>

            <Modal className=" p-5" isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                <ModalBody className=" p-0">
                  <form
                    onSubmit={handleSubmit(changePassword)}
                    className=" space-y-4"
                  >
                    <span className=" text-red-600 block text-2xl font-medium">
                      Change Password
                    </span>
                    <Input
                      variant="bordered"
                      placeholder="Enter current password"
                      isInvalid={errors.password && touchedFields}
                      errorMessage={errors.password?.message}
                      {...register("password")}
                      type="password"
                      autoComplete="current-password"
                    >
                    </Input>
                    <Input
                      variant="bordered"
                      placeholder="Enter new password"
                      isInvalid={errors.newPassword && touchedFields}
                      errorMessage={errors.newPassword?.message}
                      {...register("newPassword")}
                      type="password"
                      autoComplete="new-password"
                    >
                    </Input>

                    {isChanged && (
                      <p className=" text-red-500 text-center">{isChanged}</p>
                    )}

                    <Button isLoading={isLoading} className="" type="submit">
                      
                      Save changes
                    </Button>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>
      ) : (
        <ProfileLoadingScreen />
      )}

      {isPostsLoading ? <LoadingScreen/> :    
      <>
      
      {userPosts.map((post)=><PostCard isProfilePage={true} callUserPost={getUserPosts} key={post._id} post={post} commentlimit={post.comments.length} />)}
      
      </>
      }

    </>
  );
}
