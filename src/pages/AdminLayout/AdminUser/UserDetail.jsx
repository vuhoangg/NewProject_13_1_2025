import { Drawer, Button,  notification, message  } from  'antd';
import { useEffect, useState } from 'react';
import { handleUploadFile , updateUserAPI} from '../../../services/api.service'


const UserDetail = (props) =>{


const {isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, reloadUsers } = props;
const [selectedFile, setSelectedFile] = useState(null)
const [preview, setPreview] = useState(null)



  const showDrawer = () => {
    setIsDetailOpen(false);
  };
  const onClose = () => {
    setIsDetailOpen(false);
    setDataDetail(null);
  };

  const handleOnChangeFile =(event)=>{
    if (!event.target.files || event.target.files.length === 0) {
        setSelectedFile(null)
        setPreview(null)
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0]
    if(file) {
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
    }
    // console.log(">> check file :", file );
   
  }
//   console.log(">> check file :", preview  );

  const handleUpdateUserAvatar = async()=>{
    // step 1: upload file 
 
        const resUpload = await handleUploadFile(selectedFile, "user");
        console.log(">> check file :", resUpload);
        if(resUpload.data){
            const newAvatar = resUpload.data.fileName;
            const resUpdateAvartar = await updateUserAPI(dataDetail.id, dataDetail.username , dataDetail.email , dataDetail.phone ,dataDetail.firstName , dataDetail.lastName , dataDetail.address,  newAvatar, dataDetail.roles )
            console.log(">> newAvatar :", newAvatar);

            if (resUpdateAvartar.data){
                setIsDetailOpen(false);
                setSelectedFile(null)
                setPreview(null)
                reloadUsers();
                notification.success({
                    message: "Update user avatar ",
                    description: "Cập nhật thành công"
                })
            }else{
                notification.error({
                    message: "Error upload avatar  ",
                    description: "Cập nhật thật bại "
                })
            }
        }

  


    // step 2: update user

  }

  return (
    <>
      <Drawer width={"40vw"} title="Profile" onClose={onClose} open={isDetailOpen} maskClosable={false} >
        {dataDetail ? <>
            <p>{dataDetail?.id}</p><br/>
            <p>{dataDetail.username}</p><br/>
            <p>{dataDetail.email}</p><br/>
            <p>{dataDetail.address}</p><br/>
            {/* <p>{dataDetail.roles}</p><br/> */}
            <p>Avatar: </p><br/>

            <div style={{ marginTop: "10px", height: "200px", width: "150px", border: "1px solid #ccc"}}>
                <img  style={{  height: "100%", width: "100%", objectFit: "contain"}}
                src={`http://localhost:8082/images/user/${dataDetail.avartar}`}/>
{/* src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} */}
            </div>
           
            <div >
                <label htmlFor="btnUpload" style={{
                    display :"block",
                    width: "fit-content",
                    marginTop: "15px",
                    padding: "5px 10px ",
                    background : "orange",
                    borderRadius : "5px",
                    cursor: "pointer"
                }}>
                    Upload Avatar
                </label>
            <input hidden id='btnUpload' type="file"
             onChangeCapture={(event)=> handleOnChangeFile(event)}

             accept="image/png, image/jpeg" />
            </div>


            {preview && 
                <>
                    <div style={{ marginTop: "10px", height: "200px", width: "150px", border: "1px solid #ccc"}}>
                        <img  style={{  height: "100%", width: "100%", objectFit: "contain"}}
                        src={preview}/>
                    </div>
                    <Button type='primary' 
                    onClick={()=> handleUpdateUserAvatar() }
                     >Save</Button>
                </>
            }
            
        </>: 
        <> <p> không có dữ liệu nào </p>
        </>}
      </Drawer>
    </>
  );
};



export default UserDetail;
