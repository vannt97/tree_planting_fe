import { Form, Input, Modal, Button, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUpdateTreeNameMutation } from 'src/services/treeAPI';

interface Props {
  showRenameModal: boolean;
  treeName: string;
  id: string;
  onClose: () => void;
  getTracking: (value: any) => void;
}

const ModalRename = ({ showRenameModal, treeName, id, onClose, getTracking }: Props) => {
  const [form] = Form.useForm();
  const [updateTreeName, { isLoading }] = useUpdateTreeNameMutation();
  const {
    query: { id: treeCode },
  } = useRouter();

  useEffect(() => {
    form.setFieldsValue({
      newName: treeName,
    });
  }, [treeName, form]);

  const onRename = async ({ newName }: { newName: string }) => {
    try {
      const response = await updateTreeName({ id, treeName: newName }).unwrap();
      if (response?.success) {
        form.setFieldsValue({ treeName: response.data });
        message.success({
          content: 'Đổi tên thành công',
          duration: 5,
        });
        setTimeout(() => {
          onClose();
          getTracking({ stringCode: treeCode });
        }, 1000);
      }
    } catch (error) {
      message.error({
        content: 'Đổi tên thất bại',
        duration: 5,
      });
    }
  };

  return (
    <Modal
      title="Đổi tên cây"
      open={showRenameModal}
      onCancel={() => onClose()}
      footer={[
        <Button key="back">Hủy</Button>,
        <Button
          form="myForm"
          key="submit"
          htmlType="submit"
          className="bg-green-29 text-white-500"
          loading={isLoading}
        >
          Đổi tên
        </Button>,
      ]}
    >
      <Form id="myForm" form={form} onFinish={onRename}>
        <Form.Item
          name="newName"
          rules={[{ required: true, message: 'Vui lòng nhập tên mới cho cây' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalRename;
