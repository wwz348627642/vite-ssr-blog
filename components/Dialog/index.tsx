import type { DrawerProps, ModalProps } from 'antd';
import { ConfigProvider, Drawer, Modal } from 'antd';
import type { Locale } from 'antd/lib/locale-provider';
import zhCN from 'antd/locale/zh_CN.js'
import React, { cloneElement, useState, useEffect } from 'react';
import type { FC } from 'react';
import { createRoot } from 'react-dom/client';

const nodes: Record<string, Element> = {};

const roots: Record<string, ReturnType<typeof createRoot>> = {};

interface ModalOptions extends ModalProps {
  key?: string;
  prefixCls?: string;
  locale?: Locale;
  childrenNode?: React.FunctionComponentElement<BaseDialogProps>;
}

interface DrawerOptions extends DrawerProps {
  key?: string;
  prefixCls?: string;
  locale?: Locale;
  childrenNode?: React.FunctionComponentElement<BaseDialogProps>;
}

const getDefaultKey = () => Math.random().toString(36).substr(2);

export interface BaseDialogProps<T = unknown> {
  onClose?(data?: T): void;
}

const ModalFactory: FC<ModalOptions> = (props) => {
  const [visible, setVisible] = useState(false);
  const { childrenNode, ...restProps } = props;
  const onCancel = (data?: any) => {
    setVisible(false);
    setTimeout(() => {
      props.onCancel?.(data);
    }, 300);
  };
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 10);
  }, []);
  return (
    <Modal {...restProps} open={visible} onCancel={() => onCancel()}>
      { childrenNode ? cloneElement(childrenNode, { onClose: onCancel, ...restProps }) : null}
    </Modal>
  );
};

const loadModal = async <DialogProps extends BaseDialogProps>(
  childrenNode: React.FunctionComponentElement<BaseDialogProps>,
  options: ModalOptions = {},
) => {
  const { key = getDefaultKey(), prefixCls, locale, ...props } = options;

  const node = document.createElement('div');
  nodes[key] = node;
  document.body.appendChild(node);
  const root = createRoot(node);
  roots[key] = root;
  type DialogRes = Parameters<NonNullable<DialogProps['onClose']>>[0];

  return new Promise<DialogRes>((resolve) => {
    const onClose = (data?: DialogRes) => {
      resolve(data);
      close(key);
      // @ts-ignore, 没有 e 
      props.onCancel?.();
    };
    root.render(
      <ConfigProvider prefixCls={prefixCls} locale={locale || zhCN}>
        <ModalFactory {...props} footer={null} onCancel={onClose} childrenNode={childrenNode} />
      </ConfigProvider>
    );
  });
};

const DrawerFactory: FC<DrawerOptions> = (props) => {
  const { childrenNode, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const onClose = (data?: any) => {
    setVisible(false);
    setTimeout(() => {
      props.onClose?.(data);
    }, 300);
  };
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 10);
  }, []);
  return (
    <Drawer {...restProps} open={visible} onClose={() => onClose()}>
      {childrenNode ? cloneElement(childrenNode, {
        ...restProps,
        onClose,
      }) : null}
    </Drawer>
  );
};

const loadDrawer = async <DialogProps extends BaseDialogProps>(
  childrenNode: React.FunctionComponentElement<BaseDialogProps>,
  options: DrawerOptions = {},
) => {
  const { key = getDefaultKey(), prefixCls, locale, ...props } = options;

  const node = document.createElement('div');
  const root = createRoot(node);
  nodes[key] = node;
  document.body.appendChild(node);
  roots[key] = root;
  type DialogRes = Parameters<NonNullable<DialogProps['onClose']>>[0];

  return new Promise<DialogRes>((resolve) => {
    const onClose = (data?: DialogRes) => {
      resolve(data);
      close(key);
    };

  
    root.render(
      <ConfigProvider prefixCls={prefixCls} locale={locale || zhCN}>
        <DrawerFactory {...props} footer={null} onClose={onClose} childrenNode={childrenNode} />
      </ConfigProvider>
      ,
    );
  });
};

const unmount = (key: string) => {
  const node = nodes[key];
  const root =  roots[key];
  root.unmount();
  document.body.removeChild(node);
  delete nodes[key];
};

const close = (key?: string) => {
  if (key) return unmount(key);
  Object.keys(nodes).forEach(unmount);
};

const Dialog = {
  load: loadModal,
  loadModal,
  side: loadDrawer,
  loadDrawer,
  close,
};

export default Dialog;
