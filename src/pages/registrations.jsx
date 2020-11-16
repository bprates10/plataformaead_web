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
  ]
  const columnsCourse = [
    { dataField: 'name', text: 'Curso' },
  ]
  const [list, setList] = useState([])
  const [listCourse, setListCourse] = useState([])
  const [listStudent, setListStudent] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [showCourse, setShowCourse] = useState(false)
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
  const selectRowCourse = {

    mode: 'checkbox',
    clickToSelect: true,
    selectColumnPosition: 'right',
    selected: list[0],
    onSelect: (row) => selectRadioCourse(row),
    bgColor: ('#666661'),

  }

  const selectRadio = async (row) => {

    console.log('row => ', row)

    setName(row.name)
    setMail(row.mail)

    getDataCourse()

    setShowCourse(true)

  }
  const selectRadioCourse = async (row) => {

    console.log('row => ', row)

    let arr = list

    // if (listStudent[0].courses.length > 0) {
    //   arr.push(listStudent[0].course)
    // }

    let obj = [{ name: row.name, description: row.description }]
    arr.push(obj)

    setList(arr)

  }

  const getDataStudent = async () => {

    try {

      const res = await api.get('/students')

      console.log('res => ', res)

      if (res.data) {

        setListStudent(res.data)

      }
      console.log('listStudent => ', listStudent)

    } catch (err) {

      console.log('error => ', err)
    }

  }

  const getDataCourse = async () => {

    try {

      const res = await api.get('/courses')

      console.log('res => ', res)

      if (res.data) {

        setListCourse(res.data)

      }

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

      // if (res.data) {

      //   setList(res.data)

      // }
      // console.log('list => ', list)

    } catch (err) {

      console.log('error => ', err)
    }

  }

  const clearStates = async () => {
    setShowCourse(false)
  }

  useEffect(() => { getDataStudent() }, [])

  useEffect(() => { console.log('list => ', list) }, [list])

  useEffect(() => {

    setIsValid(false)

    if (name !== '' && mail !== '') {
      setIsValid(true)
    }

  }, [name, mail])

  return (
    <div className="students">
      { !showCourse ?
        <>
          <ToolkitProvider
            keyField="mail"
            data={listStudent}
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
        </>
        : <></>
      }

      {/* <div className="btn-add"> */}

      {
        showCourse ?
          <>
            <ToolkitProvider
              keyField="name"
              data={listCourse}
              columns={columnsCourse}
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
                      keyField='name'
                      // pagination={paginationFactory(options)}
                      selectRow={selectRowCourse}
                      {...props.baseProps}
                    />


                  </div>
                )
              }
            </ToolkitProvider>

            <form>
              <div className="btn-content">
                <button className="btn btn-info" disabled={!isValid} onClick={() => addData()}><AddIcon />Salvar</button>
                <button className="btn btn-info" onClick={() => clearStates()}><ClearIcon />Voltar</button>
              </div>
            </form>
          </>
          : <></>
      }

      {/* </div> */}

    </div>
  )

}

export default Students