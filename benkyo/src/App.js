import React from 'react';
import './App.css';

function benkyo() {
  return (
    <div className='wallpaper'>
      <Navbar />
    </div>
  );
}

function Navbar() {
  return (
    <div className='login-container'>
      <Form />
    </div>
  );
}

function Form() {
  return (
    <div className='login'>
      <form>
        <h2 className='title'>Benkyo</h2>
      </form>
    </div>
  );
}

export default benkyo;
