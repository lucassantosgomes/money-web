import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import NavBar from '../../components/navbar/navbar';
import './home.css'
import icons from '../../styles/icons';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api.js"
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css"


const Home = () => {


  let dados = [
    {id: 1, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-carro.png", categoria: "Carro", descricao: "Pagamento IPVA", valor: 2500},
    {id: 2, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-casa.png", categoria: "Casa", descricao: "Condomínio", valor: 620},
    {id: 3, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-lazer.png", categoria: "Lazer", descricao: "Sorvete no parque", valor: 17.50},
    {id: 4, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png", categoria: "Mercado", descricao: "Compras Walmart", valor: 375},
    {id: 5, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-treinamento.png", categoria: "Educação", descricao: "Faculdade", valor: 490},
    {id: 6, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-viagem.png", categoria: "Viagem", descricao: "Passagem Aérea", valor: 610},
    {id: 7, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png", categoria: "Mercado", descricao: "Compras Churrasco", valor: 144.30},
    {id: 8, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-viagem.png", categoria: "Viagem", descricao: "Hotel", valor: 330}
  ];

  let dadosFiltrados = [
    {id: 1, icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-carro.png", categoria: "Carro", descricao: "Pagamento IPVA", valor: 2500}
  ];

  const navigate = useNavigate();

  const [despesas, setDespesas] = useState([]);
  const [total, setTotal] = useState(0);

  const OpenDespesa = (id)=>{
    navigate(`/despesa/${id}`)
  }
  const DeleteDespesa = async (id)=>{
    try {
      confirmAlert({
        title: "Exclusão",
        message: "Deseja excluir a despesa",
        buttons:[{
          label: "Sim",
          onClick: async () => {
            await api.delete("/despesas/"+ id);
            ListarDespesa(); 
          }
        }, {
          label:"Não",
          onClick: () => {}
        }]
      })
      
    } catch (error) {
      
    }
  }


  const ListarDespesa = async (busca) =>{
    try {

      const response = await api.get("/despesas", {
        params: {
          filtro: busca
        }
      });

      setDespesas(response.data);
      

      const soma = response.data.reduce((acc, item)=> acc + Number(item.valor),0);
      setTotal(soma);
    } catch (error) {
      alert('erro ao buscar dados');
      console.log(error);
    }
    

  }

  useEffect(()=>{
    ListarDespesa()
  },[]);

  return <>
    <Sidebar />
    <NavBar search={true} total = {total} onClickSearch= {ListarDespesa} />
    <div className="container-home">
      <div className="title-home">
        <h1>Despesas</h1>
        <button onClick={()=>{navigate('/despesa/add')}} className='btn btn-green'>Adicionar Despesa</button>
      </div>

      <div className="box-despesa">
        <table>
          <thead>
            <tr>
              <th>Id Despesa</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th className='text-right' >Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {
              despesas.map((desp)=>{
                return (<tr>
                  <td>{desp.id}</td>
                  <td>{desp.descricao}</td>
                  <td>
                    <div>
                      <img className='icon-sm' src={desp.categoriaDetalhe.icon} alt="icone da categoria" />
                      <span className='ml-10'>
                      {desp.categoria}
                      </span>
                    </div>
                  </td>
                  <td className='text-right'>R$ {Number(desp.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className='text-right'>
                    <button onClick={()=>{OpenDespesa(desp.id)}}
                      className="btn btn-blue rounded">
                      <img src={icons.edit} className='icon-sm' />
                    </button>
                    <button 
                      onClick={() => DeleteDespesa(desp.id)}
                      className="btn btn-red ml-10 rounded">
                      <img src={icons.remove} className='icon-sm' />
                    </button>
                  </td>
                </tr>)
              })
            }

            
          </tbody>
        </table>
        {
          despesas.length == 0 && <div className='empt-despesa'>
            <img src={icons.empty} alt="icone de nada encontrado" />
            <p>Nenhuma despesa encontrada</p>
          </div>
        }
      </div>

    </div>
  </>
}

export default Home;