import { Ref, useImperativeHandle, useState } from 'react';
import { Form, Input, Modal, Typography } from 'antd';

interface IProps {
  onRef: Ref<any>;
  reFreshParent: (rowData: any) => any;
}

export default function EditProperty(props: IProps) {
  // props
  const { onRef, reFreshParent } = props;
  // state
  const [open, setOpen] = useState(false);
  // form
  const [form] = Form.useForm<{
    key: number;
    id: string;
    value: string;
  }>();

  // 暴露给父组件的方法
  useImperativeHandle(onRef, () => ({
    // 打开弹窗
    showEditModal: (rowObj: any) => showModal(rowObj),
  }));

  /**
   * 打开弹窗并初始化表单数据
   *
   * @param rowObj
   */
  function showModal(rowObj: any) {
    form.setFieldsValue({
      // -1表示当前是新增
      key: rowObj?.key || -1,
      id: rowObj?.id || undefined,
      value: rowObj?.value || undefined,
    });
    setOpen(true);
  }

  /**
   * 关闭弹窗并重置表单
   */
  function handleCancel() {
    form.resetFields();
    setOpen(false);
  }

  /**
   * 提交表单
   */
  function handleOK() {
    form
      .validateFields()
      .then((values) => {
        let rowObj: any = Object.create(null);
        rowObj.key = form.getFieldValue('key');
        rowObj.id = values.id;
        rowObj.value = values.value;
        reFreshParent(rowObj);
        setOpen(false);
      })
      .catch((info) => {
        console.log('表单校验失败: ', info);
      });
  }

  return (
    <>
      <Modal
        width={500}
        style={{ maxHeight: '50vh' }}
        title={<Typography>{'编辑属性'}</Typography>}
        open={open}
        okText={'确认'}
        cancelText={'取消'}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
          <Form.Item
            label="编号|ID"
            name="id"
            rules={[{ required: true, message: 'ID不能为空哦!' }]}
          >
            <Input placeholder={'请输入'} />
          </Form.Item>
          <Form.Item
            label="值"
            name="value"
            rules={[{ required: true, message: '值不能为空哦!' }]}
          >
            <Input placeholder={'请输入'} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
