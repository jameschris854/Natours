//Update users
const saveBtn = document.getElementById('updateUser');
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
const saveUser = async (name, email) => {
  const link = window.location.href.split('/');
  console.log(link[link.length - 1]);
  try {
    const res = await axios({
      method: 'patch',
      url: `http://localhost:5000/api/v1/users/${link[link.length - 1]}`,
      data: {
        name,
        email,
      },
      withCredentials: true,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'User details updated');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'update failed');
  }
};

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  saveUser(name, email);
});

//Change password
const updateUserPassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
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
};

updatePassword.addEventListener('click', (e) => {
  console.log('updating password');

  e.preventDefault();
  const currentPassword = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('password-confirm').value;
  updateUserPassword(currentPassword, password, confirmPassword);
});
