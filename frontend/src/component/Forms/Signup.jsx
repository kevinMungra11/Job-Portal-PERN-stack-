import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import apiRequest from '../../services/api'
import { authenticate } from '../../utils/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/store'

const Signup = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { firstName, lastName, userName, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false })
        apiRequest('POST', '/user/signup', { firstName, lastName, userName, email, password })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            firstName: "",
                            lastName: "",
                            userName: "",
                            email: "",
                            password: "",
                            error: "",
                            success: true
                        })
                    })
                    dispatch(setUser(data));
                }
            })
            .catch(() => console.log("Error in signup"))
    }

    const signUpForm = () => {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form action="">
                            <div className="form-group">
                                <p className="text-dark">firstname</p>
                                <input
                                    className='form-control'
                                    onChange={handleChange("firstName")}
                                    type="text"
                                    value={firstName}
                                />
                            </div>
                            <div className="form-group">
                                <p className="text-dark">lastname</p>
                                <input
                                    className='form-control'
                                    onChange={handleChange("lastName")}
                                    type="text"
                                    value={lastName}
                                />
                            </div>
                            <div className="form-group">
                                <p className="text-dark">Username</p>
                                <input
                                    className='form-control'
                                    onChange={handleChange("userName")}
                                    type="text"
                                    value={userName}
                                />
                            </div>
                            <div className="form-group">
                                <p className="text-dark">Email</p>
                                <input
                                    className='form-control'
                                    onChange={handleChange("email")}
                                    type="email"
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <p className="text-dark">Password</p>
                                <input
                                    className='form-control'
                                    onChange={handleChange("password")}
                                    type="password"
                                    value={password}
                                />
                            </div>
                            <button onClick={onSubmit} className='btn btn-success col-12 block mt-3'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
                        New account created successfully.
                    </div>
                    {success && !error && <Navigate to={'/user'} replace={true} />}
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {errorMessage()}
            {signUpForm()}
            {successMessage()}
        </div>
    )
}

export default Signup;