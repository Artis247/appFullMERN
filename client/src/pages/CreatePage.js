import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import {useMessage} from '../hooks/message.hook'

export const CreatePage = () => {
 
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {request,loading} = useHttp()
  const [cashFlow, setCashFlow] = useState({ 
  invoice : "",
  amount : 0,
  detail : ""
  })
  
  useEffect(() => {
    window.M.updateTextFields();
 }, [])
  
  const changeHandler = (event) => {
    setCashFlow({ ...cashFlow, [event.target.name]: event.target.value })
  }

  const pressHandler = async () => {
     try {
          const data = await request(
          "/api/link/generate",
          "POST",
          { 
           ...cashFlow },
          {
            Authorization: `Bearer ${auth.token}`,
            
          }
        )
       message(data.message)
      } catch (e) {}
  }
  
  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: "2rem" }}>
        <div className='card-content white-text'>
          <div className='input-field'>
            <input
              placeholder='Заполните счета-фактуру'
              id='invoice'
              type='text'
              name='invoice'
              value={cashFlow.invoice}
              onChange={changeHandler}
            />
            <label htmlFor='invoice'>Заполните счет фактуру</label>
          </div>
          <div className='input-field'>
            <input
              placeholder='Введите сумму счета-фактуры'
              id='amount'
              type='number'
              name='amount'
              value={cashFlow.amount}
              onChange={changeHandler}
            />
            <label htmlFor='amount'>Введите сумму счета-фактуры</label>
          </div>
          <div className='input-field'>
            <input
              placeholder='Заполните детализацию счета-фактуры'
              id='detail'
              type='text'
              name='detail'
              value={cashFlow.detail}
              onChange={changeHandler}
            />
            <label htmlFor='detail'>Заполните детализацию счета-фактуры</label>
          </div>
          <button
            className='btn grey lighten-1 black-text'
            variant="outline-success" 
            type="button"
            disabled={loading}
            onClick={pressHandler}
          >
            Записать
          </button>
        </div>
      </div>
    </div>
  )
}  