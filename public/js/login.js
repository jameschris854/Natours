const loginForm = document.querySelector('.form');
//alert function
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

//check if login form is present
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

const login = async (email, password) => {
 
  try {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/users/login',
      data: {
        email,
        password, 
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
    showAlert('error',err.response.data.message); 
  }
};
}

