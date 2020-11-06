import { PageHeaderWrapper } from "@ant-design/pro-layout"
import { Button, Card, Divider } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import styles from '@/utils/table.less';
import SearchForm from "@/components/SearchForm";
import ProTable from "@/pages/system/permission/component/ProTable";
import { ColumnProps } from "antd/lib/table";
import Service from "./service";
import encodeQueryParam from "@/utils/encodeParam";
import Save from "./save";

interface Props {

}
const DuerOS: React.FC<Props> = props => {
    const service = new Service('dueros/product');
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<any>({});
    const [saveVisible, setSaveVisible] = useState<boolean>(false);
    const [current, setCurrent] = useState<any>({});
    const [searchParam, setSearchParam] = useState({
        pageSize: 10,
    });
    useEffect(() => {
        handleSearch(encodeQueryParam(searchParam));
    }, [])
    const handleSearch = (params?: any) => {
        setSearchParam(params);
        setLoading(true);
        service.query(params).subscribe(
            (data) => setResult(data),
            () => { },
            () => setLoading(false))
    };
    const columns: ColumnProps<any>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '设备类型',
            dataIndex: 'applianceType',
        },
        {
            title: '厂商名称',
            dataIndex: 'manufacturerName',
        },
        {
            title: '动作数量',
            dataIndex: 'actionMappings',
            render: (text: any[]) => text.length
        },
        {
            title: '操作',
            width: '120px',
            align: 'center',
            render: (record: any) => (
                <Fragment>
                    <a onClick={() => {

                    }}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => {
                        // setSolveAlarmLogId(record.id);
                        // setSolveVisible(true);
                    }}>删除</a>
                </Fragment>
            )
        },
    ];
    return (
        <PageHeaderWrapper title="DuerOS">
            <Card bordered={false} style={{ marginBottom: 16 }}>
                <div className={styles.tableList}>
                    <div>
                        <SearchForm
                            search={(params: any) => {
                                setSearchParam(params);
                                handleSearch({ terms: { ...params }, pageSize: 10 });
                            }}
                            formItems={[
                                {
                                    label: '名称',
                                    key: 'name$LIKE',
                                    type: 'string',
                                },
                                {
                                    label: '设备类型',
                                    key: 'level$IN',
                                    type: 'list',
                                    props: {
                                        data: ['ERROR', 'INFO', 'WARN', 'DEBUG'],
                                        mode: 'multiple'
                                    }
                                }
                            ]}
                        />
                    </div>
                    <div>
                        <Button icon="plus" type="primary" onClick={() => {
                            setSaveVisible(true);
                            setCurrent({});
                        }}>
                            新建
                        </Button>
                    </div>

                </div>
            </Card>
            <Card>
                <div className={styles.StandardTable}>
                    <ProTable
                        loading={loading}
                        dataSource={result?.data}
                        columns={columns}
                        rowKey="id"
                        onSearch={(params: any) => {
                            handleSearch(params);
                        }}
                        paginationConfig={result}
                    />
                </div>
            </Card>

            {
                saveVisible && (
                    <Save
                        data={{}}
                        close={() => setSaveVisible(false)}
                        save={(item: any) => { console.log(item) }} />
                )
            }
        </PageHeaderWrapper>
    )
}
export default DuerOS;