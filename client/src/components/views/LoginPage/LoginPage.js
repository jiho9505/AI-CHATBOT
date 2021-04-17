import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button,  Typography } from 'antd';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { UserOutlined , LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();


  const [formErrorMessage, setFormErrorMessage] = useState('')
  
  return (
   
   
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('E-mail을 정확히 입력해주세요')
          .required('이메일을 입력해주세요'),
        password: Yup.string()
          .required('비밀번호를 입력해주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
              
                props.history.push("/counsel");
              } else {
                setFormErrorMessage('E-mail과 비밀번호를 다시 확인해주세요')
                setTimeout(() => {
                  setFormErrorMessage("")
                }, 3000);
              }
            })
            .catch(err => {
              setFormErrorMessage('E-mail과 비밀번호를 다시 확인해주세요')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app_">

            <Title level={3} style={{paddingBottom:30}}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<UserOutlined />}
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined />}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
    
              
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' 
                }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    로그인
                </Button>
                </div>
                  <Link to="/register">회원가입</Link>
        
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  
  );
};

export default withRouter(LoginPage);


