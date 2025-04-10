'use client'

import React, { useState } from 'react'
import { passQuerytoPrisma } from "@/actions/actions"

export default function Page() {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle submission logic here
    console.log('Submitted:', inputValue)
    passQuerytoPrisma(inputValue)
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={styles.input}
            placeholder="Enter your query..."
          />
          <div style={styles.inputBorder}></div>
        </div>
        <button type="submit" style={styles.button}>
          <span style={styles.buttonText}>Submit</span>
          <div style={styles.buttonGlow}></div>
        </button>
      </form>
    </div>
  )
}

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#ffffff',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '40px',
      borderRadius: '15px',
      background: '#ffffff',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 163, 255, 0.1)',
    },
    inputContainer: {
      position: 'relative',
      width: '300px',
    },
    input: {
      width: '100%',
      padding: '15px',
      fontSize: '16px',
      backgroundColor: '#f8f9fa',
      border: '1px solid rgba(0, 163, 255, 0.2)',
      borderRadius: '8px',
      color: '#333',
      transition: 'all 0.3s ease',
      outline: 'none',
      '&:focus': {
        boxShadow: '0 0 15px rgba(0, 163, 255, 0.2)',
        borderColor: '#00a3ff',
      },
    },
    inputBorder: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #00ff88, #00a3ff)',
      transition: 'all 0.3s ease',
    },
    button: {
      position: 'relative',
      padding: '12px 24px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(45deg, #00ff88, #00a3ff)',
      color: '#fff',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(0, 163, 255, 0.3)',
      },
    },
    buttonText: {
      position: 'relative',
      zIndex: 1,
    },
    buttonGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      transform: 'rotate(45deg)',
      transition: 'all 0.3s ease',
      opacity: 0,
      '&:hover': {
        opacity: 0.3,
      },
    },
  }
