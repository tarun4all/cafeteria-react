import React, { useState, useEffect } from 'react';
import { Button, Select, Modal, Form, Input, message} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const info = (msg) => {
    message.info(msg);
};

function UserAccount(props) {
    const [position, setPosition] = useState('Developer');
    const { getFieldDecorator } = props.form;
    const createUser = (e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          localStorage.setItem('user', JSON.stringify({name: values.name, designation: position, created: (new Date())}))
          props.created();
        } else {
          info(err);
        }
      });
    }
  
    const positionChange = (position) => {
        setPosition(position);
    }
  
    return(
      <div>
        <Modal
            title="Create Account"
            visible={true}
          >
            <div>
            <Form onSubmit={createUser}>
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                })(<div style={{width: '100%'}}> 
                  <Input
                    type="text"
                    style={{ width: '100%'}}
                  />
                </div>)}
              </Form.Item>
              <Form.Item label="Designation">
                {
                  getFieldDecorator('designation', {})(
                    <div style={{width: '100%'}}>
                      <Select
                        value={position}
                        onChange={positionChange}
                        style={{ width: '100%' }}
                      >
                        <Option value="Developer">Developer</Option>
                        <Option value="Accountant">Accountant</Option>
                        <Option value="Project_Manager">Project Manager</Option>
                      </Select>
                    </div>
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            </div>
          </Modal>
      </div>
    );
  }
  
const UserModal = Form.create({ name: 'customized_form_controls' })(UserAccount);

export default UserModal;
