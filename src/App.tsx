import './App.css';
import * as React from 'react';
import { useState } from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
} from 'formik';




interface MyFormValues {
  tematica: string;
  titulo: string;

}

export const MyApp: React.FC<{}> = () => {
  const [formularioEnviado, cambiarFormularioEnviaodo] = useState(false);
  return (
    <div>
      <h1>Ejemplo</h1>
      <Formik
        initialValues={{
          tematica: '',
          titulo: ''
        }}

        validate={(valores) => {
          let errores: any = {};

          if (!valores.tematica) {
            errores.tematica = 'Por favor ingresar un nombre'
          }

          if (!valores.titulo) {
            errores.titulo = 'Por favor ingresar un Titulo'
          }


          return errores;
        }}

        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log(valores)
          console.log('FORMULARIO ENVIADO');
          cambiarFormularioEnviaodo(true);
        }
        }
      >
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form>
            //ver errores
            <div>
              <label htmlFor="tematica">Tematica</label>
              <Field
                id="tematica"
                name="tematica"
                placeholder="Tematica"
                value={values.tematica}
                onchange={handleChange}
                onBlur={handleBlur}
              />
              
              {touched.tematica && errors.tematica && <div className="error">Por favor ingresar una Tematica</div>}

            </div>
            <div>

              <label htmlFor="titulo">Titulo</label>
              <Field
                id="titulo"
                name="titulo"
                placeholder="Titulo"
                value={values.titulo}
                onchange={handleChange}
                onBlur={handleBlur}
              />

              {touched.titulo && errors.titulo && <div className="error">Por favor ingresar un Titulo</div>}

            </div>
            <div>
              <button type="submit">Submit</button>
              {formularioEnviado && <p>Formulario Enviado!</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
};

export default MyApp;

//holaa
