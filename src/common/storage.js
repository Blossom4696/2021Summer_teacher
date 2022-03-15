export function setStorage(key, value, timeout = 0) {
  let now = new Date().valueOf();
  const valueWithInfo = {
    value,
    storedAt: now,
    expiredAt: timeout > 0 ? now + timeout : -1,
  }
  try{
    wx.setStorageSync(key, valueWithInfo);
    return true;
  }catch(e){
    console.error(e);
    return false;
  }
}

export function getStorage(key){
  let valueWithInfo = wx.getStorageSync(key);
  if(!valueWithInfo){
    return null;
  }

  if(valueWithInfo.expiredAt < 0 || valueWithInfo.expiredAt > new Date().valueOf()){
    return valueWithInfo.value;
  }else{
    wx.removeStorageSync(key)
    return null;
  }
}


