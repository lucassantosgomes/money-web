import Sidebar from '../../components/sidebar/sidebar';
import NavBar from '../../components/navbar/navbar';
import "./cad-despesa.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';


// import { Container } from './styles';

const CadDespesa = () => {

  const {idUrl} = useParams();

  const navigate = useNavigate();

  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');


  const salvarDados = async ()=>{

    try {
      
      if (idUrl != "add") {
        await api.put("/despesas/" + idUrl, {
          descricao,
          valor,
          categoria
        })
      }else{
        await api.post("/despesas", {
          descricao,
          valor,
          categoria
        })
      }
      
      navigate('/');
    } catch (error) {
      alert('erro ao inserir/editar dados');
      console.log(error);
    }
    
  }

  const GetDadosDespesa = async (id) => {

    try {

      const response = await api.get("/despesas/"+idUrl)

      setValor(response.data.valor);
    setDescricao(response.data.descricao);
    setCategoria(response.data.categoria);
    } catch (error) {
      alert('erro ao buscar dados');
      console.log(error)
    }
    
  }
  useEffect(()=>{
    if (idUrl != "add") {
      GetDadosDespesa(idUrl)
    }
  },[])

  return <>
    <NavBar /> 
    <Sidebar/>
    <div className="container-despesa-cad">

      <div className="box-despesa-cad">
        
         {idUrl == 'add'? <h1>Nova Despesa</h1> : <h1>Editar Despesa</h1>}

        <div className="input-group">
          <p>Valor</p>
          <input
            value={valor}
            onChange={(e)=>{setValor(e.target.value)}}
            type="text" 
            className='input-lg w100' 
            id='valor'/>
        </div>

        <div className="input-group">
          <p>Descrição</p>
          <input value={descricao} type="text" className='w100' id='valor'onChange={(e)=>{setDescricao(e.target.value)}}/>
        </div>

        <div className="input-group">
            <p>Categoria</p>
            <select value={categoria} id="categoria" className="w100" onChange={(e)=>{setCategoria(e.target.value)}}>
                <option value="Carro">Carro</option>
                <option value="Casa">Casa</option>
                <option value="Lazer">Lazer</option>
                <option value="Mercado">Mercado</option>
                <option value="Educação">Educação</option>
                <option value="Viagem">Viagem</option>                                        
            </select>
        </div>

        <div className="btn-group text-right">
          <button onClick={()=>{navigate('/')}} className='btn btn-blue-outline'>Cacelar</button>
          <button onClick={()=> salvarDados()} className='btn btn-blue ml-20'>Salvar</button>
        </div>
      </div>
      

    </div>
  </>
}

export default CadDespesa;