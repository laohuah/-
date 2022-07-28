// 学员列表页面
import React, { useEffect, useState } from 'react';
import { Table } from 'antd'
import styles from './index.less';
import { fetchStudentList } from '../../service/student';

const StuList = () => {
  const [dataSource, setDataSource] = useState([]);

  // 表格列数据
  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 180,
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
      width: 200
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 300
    },
    {
      title: '地域',
      dataIndex: 'city',
      key: 'city',
    }
  ]
  useEffect(() => {
    const getResult = async () => {
      const result = await fetchStudentList();
      setDataSource(result);
    }
    getResult();
  }, [dataSource])
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