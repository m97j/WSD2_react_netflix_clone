/*
import {Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../util/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})

export class SignInComponent implements OnInit, OnDestroy {
  isLoginVisible = true;
  email = '';
  password = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';
  rememberMe = false;
  acceptTerms = false;
  isEmailFocused = false;
  isPasswordFocused = false;
  isRegisterEmailFocused = false;
  isRegisterPasswordFocused = false;
  isConfirmPasswordFocused = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // onMounted 로직을 여기에 구현
  }

  ngOnDestroy() {
    // onUnmounted 로직을 여기에 구현
  }

  get isLoginFormValid(): boolean {
    return !!this.email && !!this.password;
  }

  get isRegisterFormValid(): boolean {
    return !!this.registerEmail &&
      !!this.registerPassword &&
      !!this.confirmPassword &&
      this.registerPassword === this.confirmPassword &&
      this.acceptTerms;
  }

  toggleCard() {
    this.isLoginVisible = !this.isLoginVisible;
    setTimeout(() => {
      document.getElementById('register')?.classList.toggle('register-swap');
      document.getElementById('login')?.classList.toggle('login-swap');
    }, 50);
  }

  focusInput(inputName: string) {
    switch(inputName) {
      case 'email': this.isEmailFocused = true; break;
      case 'password': this.isPasswordFocused = true; break;
      case 'registerEmail': this.isRegisterEmailFocused = true; break;
      case 'registerPassword': this.isRegisterPasswordFocused = true; break;
      case 'confirmPassword': this.isConfirmPasswordFocused = true; break;
    }
  }

  blurInput(inputName: string) {
    switch(inputName) {
      case 'email': this.isEmailFocused = false; break;
      case 'password': this.isPasswordFocused = false; break;
      case 'registerEmail': this.isRegisterEmailFocused = false; break;
      case 'registerPassword': this.isRegisterPasswordFocused = false; break;
      case 'confirmPassword': this.isConfirmPasswordFocused = false; break;
    }
  }

  handleLogin() {
    this.authService.tryLogin(this.email, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Login failed');
      }
    });
  }

  handleRegister() {
    this.authService.tryRegister(this.registerEmail, this.registerPassword).subscribe({
      next: () => {
        this.toggleCard();
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../util/auth/auth.service';
import './signIn.css';

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
