import { Layout, Space, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import moment from 'moment';

const Footer: FC = () => {
  
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    const now = moment().format('YYYY');
    setNow(now);
  }, [])

  return (
    <Layout.Footer>
      <Space>
        <Typography.Link href="https://beian.miit.gov.cn" target='_blank'>陕ICP备2022011626号-1</Typography.Link>
        <Typography.Text>&copy;2022 -{now}</Typography.Text>
      </Space>
    </Layout.Footer>
  )
}

export default Footer
