import { AuthContext } from "../../Shared/Context/auth-context";
import { useContext, useState } from "react";
export default function Login() {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submitHandler = () => {
    if (username == "umroh" && password === "halal") {
      auth.login();
    }
  };

  return (
    <div className='container-fluid page-body-wrapper full-page-wrapper'>
      <div className='content-wrapper d-flex align-items-stretch auth auth-img-bg'>
        <div className='row flex-grow'>
          <div className='col-lg-6 d-flex align-items-center justify-content-center'>
            <div className='auth-form-transparent text-left p-3'>
              <h4>Welcome back!</h4>
              <h6 className='font-weight-light'>Happy to see you again!</h6>
              <form className='pt-3' onSubmit={submitHandler}>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail'>Username (Password = umroh)</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='mdi mdi-account-outline text-primary'></i>
                      </span>
                    </div>
                    <input type='text' className='form-control form-control-lg border-left-0' id='exampleInputEmail' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputPassword'>Password (Password = halal)</label>
                  <div className='input-group'>
                    <div className='input-group-prepend bg-transparent'>
                      <span className='input-group-text bg-transparent border-right-0'>
                        <i className='mdi mdi-lock-outline text-primary'></i>
                      </span>
                    </div>
                    <input
                      type='password'
                      className='form-control form-control-lg border-left-0'
                      id='exampleInputPassword'
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)} // Gunakan fungsi panah di sini
                    />
                  </div>
                </div>

                <div className='my-3'>
                  <button className='btn btn-block btn-info btn-lg font-weight-medium auth-form-btn' type='submit'>
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-lg-6 login-half-bg d-flex flex-row'>
            <p className='text-white font-weight-medium text-center flex-grow align-self-end'></p>
          </div>
        </div>
      </div>
    </div>
  );
}
