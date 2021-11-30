import './App.css';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Box, Container, Select, MenuItem } from '@material-ui/core'
import axios from 'axios';
//
import Table from 'react-bootstrap/Table';
import './index.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


interface MyFormValues {
  tematica: string;
  titulo: string;
  link: string;
  estado: string;
  dependencia: string;

}

interface mostrar_todo {
  _id: string;
  tematica: string;
  titulo: string;
  link: string;
  estado: string;
  dependencia: string;
}


const opciones_estado = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' }
]



  

export const MyApp: React.FC<{}> = () => {

  let subtitle:any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }



  const [statee, cambiarState] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {

    axios.get('http://localhost:8017/api/datos_todos').then((res) => {
      console.log(res);
      cambiarState(res.data.data_todo);

    })
    //console.log (toda_data);
    //cambiarState(toda_data);
  }


  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  return (
    <div>
      <h4>Ejemplo</h4>

      <div>

        <p></p>

        <div className="mi_tabla">
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th className="tamanos_tematica">Temática</th>
                <th className="tamanos_titulo">Titulo</th>
                <th className="tamanos_link">Link</th>
                <th className="tamanos_dependencia">Dependencia</th>
                <th className="tamanos_opcion"></th>
                <th className="tamanos_opcion"></th>


              </tr>
            </thead>
            <tbody>
              {statee.map((tematicas: mostrar_todo) => (
                <tr key={tematicas._id}>
                  <td className="texto_centrado">{tematicas.estado}</td>
                  <td>{tematicas.tematica}</td>
                  <td>{tematicas.titulo}</td>
                  <td>{tematicas.link}</td>
                  <td>{tematicas.dependencia}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <button className="btn btn-primary" onClick={openModal}>Nuevo</button>
      <Modal 
        className="modal_propiedades"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className="mi_i">

        <Formik
        initialValues={{
          tematica: '',
          titulo: '',
          link: '',
          dependencia: '',
          estado: ''
        }}


        validate={(valores) => {
          let errores: any = {};

          if (!valores.tematica) {
            errores.tematica = 'Por favor ingresar un nombre'
          }

          if (!valores.titulo) {
            errores.titulo = 'Por favor ingresar un Titulo'
          }

          if (!valores.link) {
            errores.link = 'Por favor ingresar Link'
          }


          if (!valores.dependencia) {
            errores.dependencia = 'Por favor seleccionar dependencia'
          }


          if (!valores.estado) {
            errores.estado = 'Por favor seleccionar estado'
          }



          return errores;
        }}

        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log(valores)

          console.log('FORMULARIO ENVIADO');

          axios.post('http://localhost:8017/api/datos3', valores).then((res) => {
            console.log(res);
            cambiarFormularioEnviado(true);


          })

        }
        }


      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Container maxWidth="sm">
              <Box sx={{
                width: 600,
              }}>
                <div>
                  <TextField
                    fullWidth
                    id="tematica"
                    name="tematica"
                    label="Tematica"
                    placeholder=""
                    value={values.tematica}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                  />

                  {touched.tematica && errors.tematica && <div className="error">Por favor ingresar una Tematica</div>}

                </div>
                <p></p>
                <div>

                  <TextField
                    fullWidth
                    id="titulo"
                    name="titulo"
                    label="Titulo"
                    placeholder=""
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.titulo && errors.titulo && <div className="error">Por favor ingresar un Titulo</div>}

                </div>
                <p></p>
                <div>

                  <TextField
                    fullWidth
                    id="link"
                    name="link"
                    label="Link"
                    placeholder=""
                    value={values.link}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.link && errors.link && <div className="error">Por favor ingresar un Link</div>}

                </div>
                <p></p>

                <div>

                  <TextField
                    fullWidth
                    id="dependencia"
                    name="dependencia"
                    label="Dependencia"
                    placeholder=""
                    value={values.dependencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.dependencia && errors.dependencia && <div className="error">Seleccione una Dependencia</div>}
                </div>
                <p></p>
                <br></br>

                <div>
                  <Select
                    fullWidth
                    id="estado"
                    name="estado"
                    label="Estado"
                    placeholder="Seleccionar Estado"
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'Activo'}>Activo</MenuItem>
                    <MenuItem value={'Inactivo'}>Inactivo</MenuItem>
                  </Select>

                  {touched.estado && errors.estado && <div className="error">Seleccione un estado</div>}

                </div>

                <p></p>
                <p></p>
                <p></p>

                <div>
                  <button className="button button1" type="submit">Guardar</button>
                  {formularioEnviado && <div className="enviado"><p>Formulario Enviado.</p></div>}
                </div>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
      </div>
      </Modal>

    </div>


  );

  

                
};


export default MyApp;

