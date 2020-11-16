import React, { useState, useEffect } from 'react';

import api from '../services/api'
import './styles.scss'

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import 'moment/locale/pt-br'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

function Students() {

  const columns = [
    { dataField: 'name', text: 'Nome' },
    { dataField: 'mail', text: 'E-mail' },
    { dataField: 'dateOfBirth', text: 'Dt. Nascimento' },
  ]
  const [list, setList] = useState([])
  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [date, setDate] = useState()
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isError, setIsError] = useState(false)

  const { SearchBar } = Search                                            // input buscador
  const selectRow = {

    mode: 'radio',
    clickToSelect: false,
    selectColumnPosition: 'left',
    onSelect: (row) => selectRadio(row),
    selectionRenderer: (row) => {

      return <div className="view-line-credit"><i className="fas fa-eye fa-lg" style={{ color: '#0abab5', cursor: 'pointer', fontSize: '1em' }} /><VisibilityIcon style={{ size: 5 }} /></div>

    }

  }

  const selectRadio = async (row) => {

    console.log('row => ', row)

    setName(row.name)
    setMail(row.mail)
    setDate(row.dateOfBirth ? row.dateOfBirth : '')

    setIsEdit(true)

  }

  const getData = async () => {

    try {

      const res = await api.get('/students')

      console.log('res => ', res)

      if (res.data) {

        setList(res.data)

      }
      console.log('list => ', list)

    } catch (err) {

      console.log('error => ', err)
    }

  }

  const addData = async () => {

    try {

      const res = await api.post('/students', {
        name: name,
        mail: mail,
        dateOfBirth: date ? date : '',
        avatarUrl: '',
        action: isEdit ? 'edit' : 'add'
      })

      if (res.data.msg) {

        setIsError(true)
        return

      }

      if (res.data) {

        setList(res.data)

      }
      console.log('list => ', list)

    } catch (err) {

      console.log('error => ', err)
    }

  }

  const clearStates = async () => {
    setIsAdd(false)
    setName('')
    setMail('')
    setDate('')
    setIsEdit(false)
  }

  useEffect(() => { getData() }, [])

  useEffect(() => {

    setIsValid(false)

    if (name !== '' && mail !== '') {
      setIsValid(true)
    }

  }, [name, mail])

  return (
    <div className="students">

      <ToolkitProvider
        keyField="mail"
        data={list}
        columns={columns}
        search
        columnToggle
      >
        {
          props => (
            <div className="students-table">
              <SearchBar {...props.searchProps}
                placeholder="Pesquisar..."
                className="form-login"
              />
              <BootstrapTable
                headerClasses="header-class"
                striped
                hover
                showTotal="5"
                bootstrap4
                keyField='mail'
                // pagination={paginationFactory(options)}
                selectRow={selectRow}
                {...props.baseProps}
              />


            </div>
          )
        }
      </ToolkitProvider>

      <div className="btn-add">

        {isError ?
          <h1 style={{ color: 'red' }}>Já Cadastrado</h1>
          : isAdd || isEdit ?
            <>
              <form>
                <div className="form-input">
                  <label>Nome:</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-input">
                  <label>Email:</label>
                  <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className="form-input">
                  <label>Data Nasc.:</label>
                  <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="btn-content">
                  <button className="btn btn-info" disabled={!isValid} onClick={() => addData()}><AddIcon />Salvar</button>
                  <button className="btn btn-info" onClick={() => clearStates()}><ClearIcon />Voltar</button>
                </div>
              </form>
            </>
            :
            <button className="btn btn-info" onClick={() => setIsAdd(true)}><EditIcon />Adicionar</button>
        }

      </div>

    </div>
  )

}

export default Students