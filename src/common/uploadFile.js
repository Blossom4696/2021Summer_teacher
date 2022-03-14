import wepy from 'wepy';

export async function uploadImageList(imageList, directoryName="/tmp"){
  const imageUrlList = [];
  const failedImageList = [];
  for (let key in imageList){
    const image = imageList[key];
    let serverDirectory = "https://www.kaigestudy.top:8080/app/file/get_image?name=" + directoryName + "/";
    const index = image.indexOf(serverDirectory);
    if(index >= 0){
      imageUrlList[key] = image.substring(index + serverDirectory.length);
      continue;
    }
    await new Promise((resolve) => {
      wepy.uploadFile({
        url: wepy.$instance.globalData.serverUrl + '/app/file/upload_file',
        header: wepy.$instance.setHeader(),
        filePath:image,
        name: 'uploadFile',
        formData: {
          dirName: "images/" + directoryName
        },
        success(e){
          const data = JSON.parse(e.data);
          if(data.Code == 1){
            imageUrlList[key] = data.Data;
          }else{
            failedImageList.push(image);
          }
        },
        fail(e){
          failedImageList.push(image);
        },
        complete(e){
          resolve();
        }
      })
    })
  }
  return { imageUrlList, failedImageList  };
}
