/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input, Button, Tab, Pagination, Table, Checkbox, Switch } from '@alifd/next';
import { FormBinderWrapper, FormBinder , FormError } from '@icedesign/form-binder';
import '../../../index.css';
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      merchantId: '000662',
      name: ['花果山'],
      time: '20190606',
      order: '支付宝手机跳转专用',
      remark: [''],
      balance: '￥100.00',
      email: ['支付中'],
      tel: ['￥100.00'],
      role: [' ￥100.00'],
      status: '使用中',
      oper: ['查看'],
      _id: random(10000, 20000,30000,50025,68522),
    };
  });
};
const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class PlatformRouting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      data: [],
      args: [],
      value: {
        timeType: '',
        startdate: [],
        orderStatus: '',
        refundStatus: '',
        payChannel: '',
      },
    };
  }

  componentDidMount() {
    debugger;
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len)); // Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象 成功以后携带数据  resolve(应该写ajax方法)
        debugger;
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => { // data 里面为数据
          debugger;
          this.setState({
            data,
            isLoading: false,
          });
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
  renderOper = () => {
    return (
      <div>
        <Switch size='small' className='div-switch' defaultChecked={false} />
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
    this.props.onChange(value);
  };
  // 获取到选中的数据
  Choice(args) {
    debugger;
    this.setState({
      args,
    });
  }
  // 删除方法
  removes() {
    const { data,args } = this.state;
    debugger;
    let index = -1;
    args.map((id)=>{
      data.forEach((item, i) => {
        if (item._id === id) {
          index = i;
        }
      });
      if (index !== -1) {
        data.splice(index, 1);
        this.setState({
          data,
        });
      }
    });
  }
  render() {
    const { isLoading, data, current } = this.state;
    const rowSelection = {
      onChange: this.Choice.bind(this),
      getProps: (record,index) => {
        /* return {
          disabled: record.id === 100306660942,
        }; */
      },
    };
    return (
      <div className='routingrules'>
        <Tab shape='pure'>
          <Tab.Item title="平台路由覆盖">
            <div className='routingrules-content'>
              <FormBinderWrapper
                value={this.state.value}
                onChange={this.formChange}
                ref="form"
              >
                <Row wrap gutter="20" style={styles.formRow}>
                  <Col l="24">
                    <div style={styles.formItem}>
                      <span style={styles.formLabel}>商户ID：</span>
                      <FormBinder name="merchantId"
                        autoWidth={false}
                      >
                        <Input style={styles.formSelect} />
                      </FormBinder>
                      <Button className='btn-all' size="large" type="primary">搜索</Button>
                    </div>
                  </Col>
                </Row>
              </FormBinderWrapper>
            </div>
            <div className='routingrules-panel'>
              <Table loading={isLoading} dataSource={data} hasBorder={false} primaryKey='_id' rowSelection={rowSelection}>
{/*                <Table.Column
                  title=""
                  width={50}
                  dataIndex=""
                  cell={this.renderSelectall}
                />*/}
                <Table.Column title="商户ID" dataIndex="merchantId" />
                <Table.Column title="企业名称" dataIndex="name" />
                <Table.Column title="规则姓名" dataIndex="order" />
                <Table.Column title="状态" dataIndex="status" />
                <Table.Column title="操作" cell={this.renderOper} />
              </Table>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'right' }}
                current={current}
                onChange={this.handlePaginationChange}
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
