import wepy from 'wepy';

export async function uploadImageList(imageList, directoryName = "tmp") {
    const imageUrlList = [];
    const failedImageList = [];
    for (let key in imageList) {
        const image = imageList[key];
        let serverDirectory = "https://www.kaigestudy.top:8080/app/file/get_image?name=" + directoryName;
        const index = image.indexOf(serverDirectory);
        if (index >= 0) {
            const temp = image.substring(index + serverDirectory.length);
            const array = temp.match(/\/+(.+)/);
            imageUrlList[key] = array[1];
            continue;
        }
        let currentKey = key;
        await new Promise((resolve) => {
            wepy.uploadFile({
                url: wepy.$instance.globalData.serverUrl + '/app/file/upload_file',
                header: wepy.$instance.setHeader(),
                filePath: image,
                name: 'uploadFile',
                formData: {
                    dirName: "images/" + directoryName
                },
                success(e) {
                    const data = JSON.parse(e.data);
                    if (data.Code == 1) {
                        imageUrlList[currentKey] = data.Data;
                    } else {
                        failedImageList.push(image);
                    }
                },
                fail(e) {
                    failedImageList.push(image);
                },
                complete(e) {
                    resolve();
                }
            })
        })
    }
    return {imageUrlList, failedImageList};
}

// 上传音频
export async function audioUpload(audioPath, directoryName = "") {
    let serverDirectory = "https://www.kaigestudy.top:8080/app/file/get_audio?name=" + directoryName;
    const index = audioPath.indexOf(serverDirectory);
    if (index >= 0) {
        const temp = audioPath.substring(index + serverDirectory.length);
        const array = temp.match(/\/+(.+)/);
        return array[1];
    }
    return new Promise((resolve, reject) => {
        wepy.uploadFile({
            url: wepy.$instance.globalData.serverUrl + '/app/file/upload_file', //开发者服务器 url
            header: wepy.$instance.setHeader(),
            filePath: audioPath, //要上传文件资源的路径
            name: 'uploadFile', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
            formData: {
                dirName: "audios/" + directoryName
            },
            success(e) {
                try{
                    const data = JSON.parse(e.data);
                    if (data.Code == 1) {
                        resolve(data.Data);
                    }else{
                        reject("录音保存失败")
                    }
                }catch(e){
                    reject("录音保存失败")
                }
            },
            fail() {
                reject("录音保存失败")
            },
        });
    })
}
