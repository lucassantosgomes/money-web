import { useState } from 'react'
import icons from '../../styles/icons.js'
import './navbar.css'



const NavBar = (props) => {

  const [filtro, setFiltro] = useState('')

  return <div className='navbar'>
    <img src={icons.logo}/>
    <div>
      { props.search &&  <>
        <input onChange={(e)=> setFiltro(e.target.value)} type="text" id=""></input> 
        <button onClick={()=> props.onClickSearch(filtro)} className='btn btn-blue'>Buscar</button>
      </>
      }
    </div>

    <div className='dashboard'>
      {
        props.search && <>
          <div>Total de Gastos</div>
          <div>R$ {props.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </>
      }
      
    </div>
  </div>
}

export default NavBar;