import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button , Tab, Message ,Switch,Pagination,Table,Select , Menu,MenuButton, Radio, Input, Grid, DatePicker, Checkbox } from '@alifd/next';
import { actions, reducers, connect } from '@indexStore';
import moment from "moment/moment";
import { companybusinessInformation } from '@indexApi';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../index.css';

import Edit from "./Edit/index";
import Freezeuser from "./Freezeuser/index";
import Certificationstatus from "./Certificationstatus/index";

const { Item } = MenuButton;
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;
export default class Businessinformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      result: [], // 数据列表
      result2: [],
      dustyInfo: [], // 行业列表
      data: [],
      args: [],
      value: {
        id: '',
        cpName: '',
        linkName: '',
        cpIndustryCategory: '',
        linkPhone: '',
        frozenState: '',
      },
    };
  }


  componentDidMount() {
    /*    debugger; */
    this.fetchData();
  }
  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pageSize = this.state.pageSize;
        const pages = this.state.current;
        companybusinessInformation({
          pageSize,
          pages,
          ...len,
        }).then(({ status, data })=>{
          debugger;
          if (data.errCode == 0) {
            const kkk = data.data.dustyInfo;
            const channel = kkk.map(item=>({ value: item.pmsName, label: item.pmsName }));
            const resulta = Object.assign({},kkk,{ channel });
            this.setState({
              isLoading: false,
              result: data.data.companyInfo,
              dustyInfo: resulta,
              total: data.data.totalCount,
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  };

  // 搜索
  searchbtn() {
    const values = this.state.value;
    debugger;
    this.fetchData(values);
  }
  // 重置
  resetbtn() {
    this.setState({
      value: {
        id: '',
        cpName: '',
        linkName: '',
        cpIndustryCategory: '',
        linkPhone: '',
        frozenState: '',
      },
    });
  }
  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };
  renderOper = (v,i,record) => {
    debugger;
    console.log(record);
    const dustyInfo = this.state.dustyInfo;
    return (
      <div className='tb_span'>
        <span onClick={this.editBtnOpen.bind(this,record,dustyInfo)}>编辑</span>
        <span onClick={this.certificationStatusOpen.bind(this,record)}>审核</span>
        <span style={{ color: 'darkorange' }} onClick={this.freezeUserOpen.bind(this,record)}>
          {v == false ? '解冻' : null}
          {v == true ? '冻结' : null}
        </span>
      </div>
    );
  };
  renderCertification = (v,e,record) => {
    debugger;
    return (
      <div>
        <span>
          {v == 1 ? '待审核' : null}
          {v == 2 ? '审核通过' : null}
          {v == 3 ? '审核失败' : null}
        </span>
      </div>
    );
  }
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
  formChange=(value)=>{
    this.setState({
      value,
    });
  }
  editBtnOpen(record,dustyInfo) {
    this.Edit.editopen(record,dustyInfo);
  }
  freezeUserOpen(record) {
    debugger;
    this.Freezeuser.freezeUseropen(record);
  }
  certificationStatusOpen(record) {
    this.Certificationstatus.certificationopen(record);
  }
  // 获取到选中的数据
  Choice(args) {
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { result,args } = this.state;
    let index = -1;
    args.map((id)=>{
      result.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        result.splice(index, 1);
        this.setState({
          result,
        });
      }
    });
  }
  render() {
    const { isLoading, data, current, pageSize, total, result, result2, dustyInfo } = this.state;
    const payChannel = dustyInfo.channel;
    const device = [
      { value: 1, label: '冻结' },
      { value: 2, label: '解冻' },
    ];
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };

    return (
      <div className='businessinformation'>
        {/* <Resetpassword ref={ node => this.Resetpassword = node } /> */}
        <Edit ref={ node => this.Edit = node } fetchData={this.fetchData.bind(this)} />
        <Freezeuser ref={ node => this.Freezeuser = node } fetchData={this.fetchData.bind(this)} />
        <Certificationstatus ref={ node => this.Certificationstatus = node } fetchData={this.fetchData.bind(this)} />
        <Tab shape='pure'>
          <Tab.Item title="商户信息">
            <div className='businessinformation-top'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                {/* <Row wrap gutter="20">
                  <Col l="24"> */}
                <div style={styles.formItem}>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>商户ID：</span>
                    <FormBinder name="id"
                      autoWidth={false}
                    >
                      <Input style={styles.formSelect} placeholder='' />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>企业名称：</span>
                    <FormBinder name='cpName'>
                      <Input style={styles.formSelect} placeholder='' />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>法人姓名：</span>
                    <FormBinder name='linkName'>
                      <Input style={styles.formSelect} placeholder='' />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>所属行业：</span>
                    <FormBinder name='cpIndustryCategory'>
                      <Select style={styles.formSelect} dataSource={payChannel} />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>手机号：</span>
                    <FormBinder name='linkPhone'>
                      <Input style={styles.formSelect} className='input-bg' placeholder='' />
                    </FormBinder>
                  </div>
                  <div style={styles.formItemdiv}>
                    <span style={styles.formLabel}>状态：</span>
                    <FormBinder name='frozenState' >
                      <Select style={styles.formSelect} dataSource={device} />
                    </FormBinder>
                  </div>
                  <Button className='btn-all' size="large" type="primary" onClick={this.searchbtn.bind(this)}>搜索</Button>
                  <Button className='btn-all' size="large" type="primary" style={{ opacity: '0.5' }} onClick={this.resetbtn.bind(this)}>重置</Button>
                </div>
                {/* </Col>
                  <Col l="24"> */}
                {/* <div style={styles.formItemTwo}>

                    </div> */}
                {/*  </Col>
                </Row> */}
              </FormBinderWrapper>
            </div>
            <div className='businessinformation-panel' >
              <Table loading={isLoading} dataSource={result} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
                <Table.Column title="商户ID" dataIndex="_id" />
                <Table.Column title="企业名称" dataIndex="cpName" />
                <Table.Column title="统一社会信用代码" dataIndex="cpBusinessNumber" />
                <Table.Column title="法人姓名" dataIndex="linkName" />
                <Table.Column title="企业地址" dataIndex="cpAddress" />
                <Table.Column title="所属行业" dataIndex="cpIndustryCategory" />
                <Table.Column title="联系方式" dataIndex="linkPhone" />
                <Table.Column title="邮箱" dataIndex="linkEmail" />
                {/* <Table.Column title="上次登录时间" dataIndex="role" />
                <Table.Column title="登录状态" cell={this.renderStatus} />
                <Table.Column title="权限状态" cell={this.renderPermission} /> */}
                <Table.Column title="认证状态" dataIndex="cpStatus" cell={this.renderCertification} />
                <Table.Column title="操作" dataIndex="frozenState" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
                pageSize={pageSize}
                total={total}
              />
              <Button className='btns-all' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}

const styles = {
  divMargin: {
    margin: '20px 0px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  formItemTwo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  formLabel: {
    textAlign: 'left',
    marginRight: '5px',
  },
  formSelect: {
    width: '200px',
    marginRight: '25px',
  },
  delbtn: {
    marginTop: '-50px',
  },
  formItemdiv: {
    margin: '10px 0',
  },
};
