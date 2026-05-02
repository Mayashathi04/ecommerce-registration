import React, { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', 
    password: '', confirmPassword: '', phoneNumber: '',
    gender: '', occupation: '', agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (name, value) => {
    let error = '';
    if (!value && name !== 'agreeTerms') error = 'Required';
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) error = 'Invalid Email';
    if (name === 'agreeTerms' && value === false) error = 'Accept terms to proceed';
    if (name === 'confirmPassword' && value !== formData.password) error = 'Mismatch';
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
    setErrors({ ...errors, [name]: validate(name, val) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validate(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setIsSuccess(true);
  };

  return (
    <div className="form-container">
      <h2>SIGNUP HERE</h2>
      {isSuccess && <div className="success-banner">You Account is Created Successfully! ✅</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Row 1: First and Last Name */}
        <div className="form-row">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleChange} />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
        </div>

        {/* Row 2: Email and Phone */}
        <div className="form-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" onChange={handleChange} maxLength="10" />
          </div>
        </div>

        {/* Row 3: Passwords */}
        <div className="form-row">
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange} />
          </div>
        </div>

        {/* Gender & Occupation Row */}
        <div className="form-row align-center">
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="radio-group">
            <label><input type="radio" name="occupation" value="student" onChange={handleChange}/> student</label>
            <label><input type="radio" name="occupation" value="professional" onChange={handleChange}/> professional</label>
          </div>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" name="agreeTerms" id="terms" onChange={handleChange} />
          <label htmlFor="terms">Agree to terms and conditions</label>
        </div>
        {errors.agreeTerms && <p className="terms-error">{errors.agreeTerms}</p>}

        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
};

export default SignupForm;