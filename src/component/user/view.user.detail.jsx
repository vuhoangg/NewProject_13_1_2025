import { Drawer, Button  } from  'antd';
// import { useEffect, useState } from 'react';


const ViewUserDetail = (props) =>{


const {isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail} = props;


// console.log("check data ", dataDetail);
// console.log("check dataUpdate id ", dataDetail?._id)

  const showDrawer = () => {
    setIsDetailOpen(false);
  };
  const onClose = () => {
    setIsDetailOpen(false);
    setDataDetail(null);
  };

  return (
    <>
      <Drawer width={"40vw"} title="Basic Drawer" onClose={onClose} open={isDetailOpen} maskClosable={false} >
        {dataDetail ? <>
            <p>{dataDetail?._id}</p><br/>
            <p>{dataDetail.email}</p><br/>
            <p>{dataDetail.name}</p><br/>
            <p>{dataDetail.address}</p><br/>
            <p>Avatar: </p><br/>
            <div>
                <img  width={"260px"} height={"260px"} 
                src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"/>
{/* src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} */}
            </div>
           
            <div>
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
            <input hidden id='btnUpload' type="file" accept="image/png, image/jpeg" />
            </div>
            
        </>: 
        <> <p> không có dữ liệu nào </p>
        </>}
      </Drawer>
    </>
  );
};



export default ViewUserDetail;
