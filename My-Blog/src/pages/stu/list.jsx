// 学员列表页面
import React from 'react';
import { Table } from 'antd'
import styles from './index.less';

const StuList = () => {

  // 表格列数据
  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '地域',
      dataIndex: 'city',
      key: 'city',
    }
  ]
  const dataSource = [
    {"name":"苏刚","age":15,"score":26,"city":"重庆市","time":"2018-04-28"},
    {"name":"史军","age":20,"score":36,"city":"重庆市","time":"1986-06-24"}
  ]
  return (
    <div className={styles['stu-container']}>
      <Table 
        columns={column}
        dataSource={dataSource}
      />
    </div>
  );
};

export default StuList;