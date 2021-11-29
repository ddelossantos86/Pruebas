import './App.css';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Box, Container, Select, MenuItem } from '@material-ui/core'
import axios from 'axios';

interface MyFormValues {
  tematica: string;
  titulo: string;
  link: string;
  dependencia: string;
  estado: string;
}

interface mostrar_todo {
  _id: string;
  tematica: string;
  titulo: string;
  link: string;
  estado: string;
}

const opciones_estado = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' }
]

export const MyApp: React.FC<{}> = () => {

  
  const [statee, cambiarState] = React.useState([]);
  
    React.useEffect(() => {
    obtenerDatos()}, [])

  const obtenerDatos = async () => {

    axios.get('http://localhost:8017/api/datos_todos').then((res) => {
      console.log(res);
      cambiarState (res.data.data_todo);
     
    })
    //console.log (toda_data);
    //cambiarState(toda_data);
  }


  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  return (
    <div>
      <h4>Ejemplo</h4>
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
            errores.estado = 'Seleccionar estado'
          }



          return errores;
        }}

        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log(valores)

          console.log('FORMULARIO ENVIADO');
          
           axios.post('http://localhost:8017/api/datos3', valores ).then((res) => {
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
                  
                  { touched.tematica && errors.tematica && <div className="error">Por favor ingresar una Tematica</div> }
                
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
 
 <div>
   <ul>

{

statee.map((tematicas:mostrar_todo) => (

<li key={tematicas._id}>{tematicas.tematica } - {tematicas.titulo} / {tematicas.estado}</li>

))}

   </ul>
 </div>

  </div>


  );
};

export default MyApp;

