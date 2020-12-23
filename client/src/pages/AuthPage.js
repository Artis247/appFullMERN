import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    faceAccount: "",
    password: "",
    name: "",
    secondName: "",
  });

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form })
      console.log("Data", data)
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form })
      auth.login(data.token, data.roomerId)
      console.log(data)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Управленческий учет доходов сети отелей</h1>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Введите л/с'
                  id='faceAccount'
                  type='text'
                  name='faceAccount'
                  className='yellow-input'
                  value={form.faceAccount}
                  onChange={changeHandler}
                />
                <label htmlFor='faceAccount'>Лицевой счет</label>
              </div>

              <div className='input-field'>
                <input
                  placeholder='Введите пароль'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Пароль</label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='Имя'
                  id='name'
                  type='text'
                  name='name'
                  className='yellow-input'
                  value={form.name}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Имя</label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='Фамилия'
                  id='secondName'
                  type='text'
                  name='secondName'
                  className='yellow-input'
                  value={form.secondName}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Фамилия</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn btn-primary active'
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}