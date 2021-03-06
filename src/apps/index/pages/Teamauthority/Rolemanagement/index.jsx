/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import { roleList } from '@indexApi';
import '../../index.css';
import Newrole from "./Newrole";
import { Message } from "@alifd/next/lib/index";

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Rolemanagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 0,
      isLoading: false,
      data: [],
      role: [],
      args: [],
      value: {
        cpName: '',
        cpId: '',
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const pageSize = this.state.pageSize;
        const page = this.state.current;
        roleList({
          page,
          pageSize,
          ...len,
        }).then(({ status, data })=>{
          debugger;
          if (data.errCode == 0) {
            this.setState({
              premissions: data.data.premissions, // 新增角色的权限值
              isLoading: false,
              role: data.data.role, // 列表
              total: data.data.totalCount, // 列表总数
            });
          } else {
            Message.success(data.message);
          }
        });
      }
    );
  };

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
  renderOper = (value, index, record) => {
    debugger;
    return (
      <div className='tb_span'>
        <span onClick={this.newroleBtnOpen.bind(this, record)}>编辑</span>
      </div>
    );
  };
  renderSelectall = () => {
    return (
      <div>
        <Checkbox defaultChecked />
      </div>
    );
  };
  formChange = (value) => {
    this.setState({
      value,
    });
  };
  /*  renderStatus = (datas) => {
    return (
      <Switch size='small' className='div-switch' id="enabled" value="enabled" checked={datas.enabled} />
    );
  }; */
  // 获取到选中的数据
  Choice(args) {
    this.setState({
      args,
    },);
  }
  // 删除方法
  removes() {
    const { role,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      role.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        role.splice(index, 1);
        this.setState({
          role,
        });
      }
    });
  }
  newroleBtnOpen=(record)=> {
    const premissions = this.state.premissions;
    this.Newrole.newroleopen(record,premissions);
  }
  search() {
    const values = this.state.value;
    this.fetchData(values);
  }
  render() {
    const { isLoading, data, current, pageSize, total, role } = this.state;
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record, index) => {

      },
    };
    return (
      <div className='rolemanagement'>
        <Newrole ref={ node => this.Newrole = node } fetchData={this.fetchData.bind(this)} />
        <Tab shape='pure' className='income-tab'>
          <Tab.Item title="角色管理">
            <div className='rolemanagement-content'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>商户ID：</span>
                      <FormBinder name="cpId"
                        autoWidth={false}
                      >
                        <Input style={styles.formSelect} />
                      </FormBinder>
                      <span style={styles.formLabel}>企业名称：</span>
                      <FormBinder name="cpName"
                        autoWidth={false}
                      >
                        <Input style={styles.formSelect} />
                      </FormBinder>
                      <Button className='btn-all' size='large' type='primary' onClick={this.search.bind(this)}>搜索</Button>
                      {/* <Button className='btn-all bg' size="large" type="secondary" onClick={this.newroleBtnOpen.bind(this)}>新增角色</Button> */}
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='rolemanagement-panel'>
              <Table loading={isLoading} dataSource={role} hasBorder={false} primaryKey='_id' rowSelection={rowSelection }>
                {/*                <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                /> */}
                <Table.Column title="商户ID" dataIndex="cpId._id" />
                <Table.Column title="企业名称" dataIndex="cpId.cpName" />
                {/* <Table.Column title="姓名" dataIndex="time" /> */}
                <Table.Column title="角色名称" dataIndex="description" />
                <Table.Column title="描述" dataIndex="notes" />
                {/* <Table.Column title="权限类型" dataIndex="notes" /> */}
                {/* <Table.Column title="状态" dataIndex="enabled" cell={this.renderStatus} /> */}
                <Table.Column title="操作" dataIndex="oper" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                pageSize={pageSize}
                total={total}
                onChange={this.handlePaginationChange}
              />
              <Button className='btn-all' size='large' type='primary' style={styles.delbtn} onClick={this.removes.bind(this)}>删除</Button>
            </div>
          </Tab.Item>
        </Tab>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
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
  formSpecial: {
    width: '200px',
    marginRight: '10px',
  },
  formSelect: {
    width: '200px',
    marginRight: '25px',
  },
  formTime: {
    marginRight: '25px',
  },
  delbtn: {
    marginLeft: '20px',
  },
};
