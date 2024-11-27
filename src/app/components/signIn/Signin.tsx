import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../util/auth/auth.service';
import './signin.css';

const SignIn: React.FC = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // onMounted 로직
    return () => {
      // onUnmounted 로직
    };
  }, []);

  const isLoginFormValid = !!email && !!password;

  const isRegisterFormValid =
    !!registerEmail &&
    !!registerPassword &&
    !!confirmPassword &&
    registerPassword === confirmPassword &&
    acceptTerms;

  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
    setTimeout(() => {
      document.getElementById('register')?.classList.toggle('register-swap');
      document.getElementById('login')?.classList.toggle('login-swap');
    }, 50);
  };

  const handleFocus = (inputName: string) => {
    const inputElement = document.getElementById(inputName);
    if (inputElement) {
      inputElement.classList.add('focused');
    }
  };

  const handleBlur = (inputName: string) => {
    const inputElement = document.getElementById(inputName);
    if (inputElement) {
      inputElement.classList.remove('focused');
    }
  };

  const handleLogin = () => {
    AuthService.tryLogin(email, password).then(
      (user) => {
        navigate('/');
      },
      (error) => {
        alert('Login failed');
      }
    );
  };

  const handleRegister = () => {
    AuthService.tryRegister(registerEmail, registerPassword).then(
      () => {
        toggleCard();
      },
      (err) => {
        alert(err.message);
      }
    );
  };

  return (
    <div>
      <div className="auth-card" id="login" style={{ display: isLoginVisible ? 'block' : 'none' }}>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
        />
        <button onClick={handleLogin} disabled={!isLoginFormValid}>Login</button>
      </div>

      <div className="auth-card" id="register" style={{ display: !isLoginVisible ? 'block' : 'none' }}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          onFocus={() => handleFocus('registerEmail')}
          onBlur={() => handleBlur('registerEmail')}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          onFocus={() => handleFocus('registerPassword')}
          onBlur={() => handleBlur('registerPassword')}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => handleFocus('confirmPassword')}
          onBlur={() => handleBlur('confirmPassword')}
        />
        <label>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          Accept Terms and Conditions
        </label>
        <button onClick={handleRegister} disabled={!isRegisterFormValid}>Register</button>
      </div>

      <button onClick={toggleCard}>Toggle</button>
    </div>
  );
};

export default SignIn;
