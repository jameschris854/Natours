//Update users
const saveBtn = document.getElementById('updateUser');
const userDataForm = document.querySelector('.form-user-data')
const updatePassword = document.getElementById('updatePassword');

// const hideAlert = () => {
//   const el = document.querySelector('.alert');
//   if (el) el.parentElement.removeChild(el);
// };

// const showAlert = (type, msg) => {
//   hideAlert();
//   const markup = `<div class="alert alert--${type}">${msg}</div>`;
//   document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
//   window.setTimeout(hideAlert, 5000);
// };
const saveUser = async (data) => {
  try {
    const link = window.location.href.split('/');
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    const res = await axios({ 
      method: 'patch',
      url: `http://localhost:5000/api/v1/users/updateMe`,   
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Updating details');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'update failed');
  }
};

userDataForm.addEventListener('submit', (e) => {
  console.log('data processing');
  e.preventDefault();
  const form = new FormData() 
  form.append('name',document.getElementById('name').value)
  form.append('email',document.getElementById('email').value)
  form.append('photo', document.getElementById('photo').files[0])
  console.log(form.entries());
  saveUser(form);
});

//Change password
const updateUserPassword = async (passwordCurrent,
  password,
  passwordConfirm) => {
  console.log('inside');
  try {
    const res = await axios({
      method: 'patch',
      url: `http://localhost:5000/api/v1/users/updateMyPassword`,
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
      withCredentials: true,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password succesfully updated');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'update failed');
  }
}

updatePassword.addEventListener('click', (e) => {
  console.log('updating password');
  e.preventDefault();
  const currentPassword = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('password-confirm').value;
  updateUserPassword(currentPassword, password, confirmPassword);
});
