 
function url(param: string){
  const furl ="http://localhost:3000/"
  if(param.length == 0){
    return furl
  }
  return furl+param;
}
function __storage(nmFile:string){
  return localStorage.getItem(nmFile);
}

function _$(val:string){
  const uang = new Intl.NumberFormat('en-US',
      {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 3
      }
  );
  var tam="";
  if(val==null || val=='null'){
      return '';
  }
  if(uang.format(Number(val)).substring(0,1)=="$"){
      tam=uang.format(Number(val)).substring(1);
  }else{
      tam=uang.format(Number(val));
  }
  return tam.substring(0,tam.length-4);
} 
function checkLevel():boolean {
  try {
    const token =__storage("token");
    const {kdRA} = JSON.parse(atob(String(token).split('.')[1]));
    if(kdRA==1){
      return true;
    }
  } catch (error) {
    
  }
  return false;
} 
export { url,__storage, _$,checkLevel, } 