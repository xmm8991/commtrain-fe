import React,{Component} from 'react';
import ProCard from '@ant-design/pro-card';
import { Avatar, Button, Tree, List, Result, Card, Table, Modal, Form, Input, Row, Divider ,Popconfirm, Layout} from 'antd';
import { history, connect } from 'umi';
import PropTypes from 'prop-types';

const { Sider, Content } = Layout;
const { DirectoryTree } = Tree;

/*const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];*/

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  //products: PropTypes.dict.isRequired,
};

class DocPage extends Component {
  //表单内容修改
  onChangeField = (name,e) => {
    const {dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload: {
        [name]: e.target.value,
      }
    })
  }
  //删除文档
  ondeleteDoc = (id) => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/deleteDoc',
      payload: {
        id,
      }
    })
  }
  //点击新建文件夹，设置弹窗可见
  onClickCreateFolder = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/onClickCreateFolder',
      payload:{

      }
    })
  }
  //确认创建新文件夹
  createFolderVisibleOk = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/createFolderVisibleOk',
      payload:{
        
      }
    })
  }
  //关闭新建文件夹弹窗
  createFolderVisibleCancel = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/createFolderVisibleCancel',
      payload:{

      }
    })
  }
  //删除文件夹
  ondeleteFolder = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type:'docModel/deleteFolder',
      payload: {
        id,
      }
    })
    console.log('delete ' + id);
  }
  oneditFolder = (id,e) => {
    console.log('edit ' + id);
  }
  onclickFolder = (id,e) => {
    console.log('click ' + id);
  }
  render(){
    const {docModel,dispatch} = this.props;
    const {listcontent,createFolderVisible,addfoldername,project_name,folderlist} = docModel;
    var treeData = [];
    for (var i=0;i<folderlist.length;i++){
      treeData.push({title:folderlist[i].folder_name,key:'0-'+folderlist[i].folder_id,children:[]});
    };
    return (
      <Layout>
        <Sider style={{ height: '100%', background: 'white' ,minHeight: document.documentElement.clientHeight - 140}}>
          <Button type="default" style={{width:'100%',backgroundColor:'white'}} onClick={this.onClickCreateFolder}>
            +新建文件夹
          </Button>
          <Modal
            visible={createFolderVisible}
            title="新建文件夹"
            onOk={this.createFolderVisibleOk}
            onCancel={this.createFolderVisibleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.createFolderVisibleOk}>
                确定
              </Button>,
              <Button key="back" onClick={this.createFolderVisibleCancel}>
                取消
              </Button>,
            ]}
          >
            <p>新建文件夹</p>
            <Input value={addfoldername} addonBefore="文件夹名称*" addonAfter="" onChange={this.onChangeField.bind(this,'addfoldername')}/>
          </Modal>
          <List
            itemLayout="horizontal"
            dataSource={folderlist}

            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.folder_name}
                  onClick={this.onclickFolder.bind(this,item.folder_id)}
                />
                <Popconfirm title="确认删除此文件夹?" onConfirm={this.ondeleteFolder.bind(this,item.folder_id)}>
                  <Button>删除</Button>
                </Popconfirm>
                <Button onClick={this.oneditFolder.bind(this,item.folder_id)}>编辑</Button>
              </List.Item>
            )}
          />,
        </Sider>
        <Content style={{ height: '100%', background: 'white' ,minHeight: document.documentElement.clientHeight - 140}}>
          <div>
            <h2>List of Products</h2>
            <ProductList onDelete={this.ondeleteDoc} products={listcontent} />
          </div>
        </Content>
      </Layout>
    );
  }

}

export default connect(({ docModel }) => ({
  docModel,
}))(DocPage);

/*<span style={{marginLeft:'10%'}}>{project_name}</span>
<DirectoryTree
  multiple
  defaultExpandAll
  onSelect={this.onSelect}
  onExpand={this.onExpand}
  treeData={treeData}
/>*/