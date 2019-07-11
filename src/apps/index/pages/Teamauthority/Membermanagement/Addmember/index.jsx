import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input,Button , Grid, Form, DatePicker , Tab,Message ,Table,Pagination,Select,Radio,Switch, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import { openInvoice,changeInvoiceInfo } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';

const FormItem = Form.Item;

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 6 },
  wrapperCol: { s: 12, l: 14 },
};
export default class Addmember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: null,
      confirm: null,
      value: {
        psd1: '',
        psd2: '',
        companyname: '',
        invoicetype: '',
        invoice: '',
        bank: '',
        accountopening: '',
        taxnumber: '',
        email: '',
        status1: '',
        status2: '',
        radio1: '',
        radio2: '',
        e_mail: '',
        jiaose: '',
      },
    };
  }

  addmemberclose() {
    this.setState({
      open: false,
      content: null,
    });
  }
  addmemberopen(content,confirm) {
    this.setState({
      open: true,
      content,
      confirm,
    });
    this.confirmCallBack = confirm;
  }
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  SubInvoiceinfo(r,v) {
    changeInvoiceInfo({
      ...r,
    }).then(({ status,data })=>{
      if (data.errCode == 0) {
        Message.success(data.message);
        this.billinginformationclose();
        this.props.fetchData();
      }
    });
    debugger;
    /* this.refs.form.validateAll((errors, values) => {
      debugger;
    }) */
  }
  render() {
    const { content, confirm } = this.state;
    const type = [
      { value: '0', label: '企业增值税专用发票' },
      { value: '1', label: '企业增值税普通发票' },
      { value: '2', label: '组织增值税普通发票' },
      { value: '3', label: '个人增值税普通发票' },
    ];
    if (!this.state.open) return null;
    return (
      <div className='newrole-bulletbox'>
        <div className='newrole-title'>
          <h2>新增角色</h2>
        </div>

        <div className='newrole-content'>
          <Form className='form'>
            <FormItem
              label='商户ID'
              {...formItemLayout}
            >
              <Input
                name='invoiceType'
                placeholder='请输入'
                /*                style={{ width: '100%' }}
                                dataSource={confirm}
                                defaultValue={content.invoiceType} */
              />
            </FormItem>
            <FormItem
              label='企业名称'
              {...formItemLayout}
            >
              <Input
                name='psd1'
                placeholder='请输入'
                /*              defaultValue={content.company} */
              />
            </FormItem>

            <FormItem
              label='真实姓名'
              {...formItemLayout}
              /*asterisk*/
            >
              <Input
                name="psd2"
                placeholder="请输入真实姓名"
                /* defaultValue={content.invoiceTitle} */
              />
            </FormItem>

            <FormItem
              label='用户名'
              {...formItemLayout}
            >
              <Input
                name="bank"
                placeholder=''
/*                defaultValue={content.bank}*/
              />
            </FormItem>

            <FormItem
              label='密码'
              {...formItemLayout}
            >
              <Input
                name="psd1"
                htmlType='password'
                placeholder=''
                /*                defaultValue={content.bank}*/
              />
            </FormItem>
            <FormItem
              label='确认密码'
              {...formItemLayout}
            >
              <Input
                name="psd2"
                htmlType='password'
                placeholder=''
                /*                defaultValue={content.bank}*/
              />
            </FormItem>
            <FormItem
              label='联系方式'
              {...formItemLayout}
            >
              <Input
                name="tel"
                placeholder=''
                /*                defaultValue={content.bank}*/
              />
            </FormItem>
            <FormItem
              label='电子邮箱'
              {...formItemLayout}
            >
              <Input
                name="e_mail"
                placeholder=''
              />
            </FormItem>
            <FormItem
              label='所属角色'
              {...formItemLayout}
            >
              <Select
                name="jiaose"
                dataSource='type'
              />
            </FormItem>
            <FormItem
              label='操作权限'
              {...formItemLayout}
            >
              <Switch defaultChecked value="">（是否禁用）</Switch>
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }} >
              <Form.Submit
                style={styles.submitbtn}
                validate
                type="primary"
                onClick={(v, e) => this.SubInvoiceinfo(v,e)}
              >
                添加
              </Form.Submit>
              <Form.Reset style={styles.cancelbtn} onClick={this.addmemberclose.bind(this)}>取消</Form.Reset>
            </FormItem>
          </Form>
        </div>


      </div>
    );
  }
}

const styles = {
  cancelbtn: {
    display: 'inline-block',
    marginLeft: '10px',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(230, 241, 252, 1)',
    color: 'rgba(78, 126, 232, 1)',
    borderColor: 'rgba(193, 241, 248, 1)',
    borderRadius: '4px',
  },
  submitbtn: {
    display: 'inline-block',
    width: '80px',
    height: '28px',
    backgroundColor: 'rgba(86, 119, 252, 1)',
    borderRadius: '4px',
  },
};
