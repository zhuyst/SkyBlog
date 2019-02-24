import React from 'react';

import NavImage from './NavImage';
import Rows from './rows/Rows';

import '../../static/css/home/home.css';

class Index extends React.Component {
  componentWillMount() {
    document.title = '青云的小窝 Powered By SkyBlog';
  }

  render() {
    return [
      <NavImage key={1} />,
      <Rows key={2} />,
    ];
  }
}

export default Index;
