import ProcessDesigner from '@/components/ProcessDesigner/ProcessDesigner';
import { message } from 'antd';

// 引入样式
import './index.less';
import { useEffect, useState } from 'react';
import { Provider } from '@/hox/hook/hooks';

export default function IndexPage() {
  const [visible, setVisible] = useState<boolean>(
    document.documentElement.clientWidth > 1080,
  );

  useEffect(() => {
    watchClientWidth();
    window.addEventListener('resize', watchClientWidth);
  }, []);

  function watchClientWidth() {
    let clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 1080) {
      if (visible) {
        setVisible(false);
        message.warning('请保证您的窗口宽带大于1080').then(() => {});
      }
    } else {
      setVisible(true);
    }
  }

  return (
    <Provider>
      <div style={{ display: visible ? 'unset' : 'none' }}>
        <ProcessDesigner />
      </div>
    </Provider>
  );
}
