import React from 'react';
import axios from 'axios';
import serverAddress from '../constants/serverFile';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";


const LoginForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email= e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const response = await axios({
        method: 'post',
        url: `${serverAddress}/account/login`,
        headers: {}, 
        data: {
          email: `${email}`, // This is the body part
          password: `${password}`
        }
      });
      const token = response.data;
      localStorage.setItem('token', token);
      // Zapisanie danych do zmiennej lub przekazanie ich dalej
      console.log(token);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      // Obsługa błędów
    }
  };

  return (
    <section className="rounded-xl py-10">
      <div className="flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>            
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {error && <p className='text-[16px] pb-2 font-poppins text-red-500'>{error}</p>} {/* Wyświetlanie błędu, jeśli istnieje */}
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
