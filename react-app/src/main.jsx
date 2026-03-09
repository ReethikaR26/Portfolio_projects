import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const myelement=(
  <table>
    <tr>Row 1<td>Table data</td></tr>
    
  </table>
);
createRoot(document.getElementById('root')).render(
  myelement
)
