import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result))
        navigate('/')
    };

  return (
    <div>
      <div className="row justify-content-center mx-0">
        <div className="col-lg-5 col-sm-9">
          <h3 className="mb-5">Register Now</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" onChange={handleInputChange} value={name} placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" onChange={handleInputChange} value={email} placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" onChange={handleInputChange} value={password} placeholder="Enter your password" />
            </div>

            <button type="submit" className="primary-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
