const signupBtn = document.getElementById('signUp');

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
  

const signUpUser= async (name,email,password,passwordConfirm) =>{
    try{
    const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/v1/users/signup',
        data: {
            name,
            email,
            password,
            passwordConfirm
        },
        withCredentials: true,
      });
      if (res.data.status === 'success') {
        showAlert('success','logged in successfully');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
        console.log(err);
      showAlert('error',err.response.data.message); 
    }
}
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('password-confirm').value;
    signUpUser(name, email,password,confirmPassword);
  });