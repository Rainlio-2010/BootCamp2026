// 确保你在文件顶部引入了 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from 'react-bootstrap';

function TestBootstrap() {
  return (
    <div className="container mt-5">
      {/* 测试 1: 颜色类和间距类 */}
      <div className="alert alert-info">
        如果这个框是蓝色的，说明 Bootstrap **CSS** 加载成功了！
      </div>

      {/* 测试 2: React-Bootstrap 组件 */}
      <Button variant="danger">
        如果我是红色的，说明 **React-Bootstrap** 运行正常！
      </Button>
    </div>
  );
}