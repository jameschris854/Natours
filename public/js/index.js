const logOutBtn = document.getElementById('logout');
const hideAlert = () =>{
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
  }
  
  const showAlert = (type, msg) =>{
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;  
    document.querySelector('body').insertAdjacentHTML('afterbegin',markup);
    window.setTimeout(hideAlert,5000)
  }
  

const logout = async () => {
    try{
      const res = await axios({
        method: 'get',
        url: 'http://localhost:5000/api/v1/users/login',
      });
      console.log(res);
      if(res.data.status = 'success'){
        showAlert('success','logging out');
        window.setTimeout(() => {
            location.assign('/');
          }, 1500);
      };
    }catch(err){
      showAlert('error','Error logging out');
    }
  }
if(logOutBtn){
  logOutBtn.addEventListener('click',(e) => {
    e.preventDefault()
    logout()
  })
}