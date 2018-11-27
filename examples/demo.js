import FabButton from '../src';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/index.less';


ReactDOM.render(<div>
 <FabButton reverse={true} icon={'add'}>
    <span>sdsdf</span>
    <span>face</span>
    <span>mail</span>
  </FabButton>

  <FabButton
    reverse={false}
    icon={'test'}
    position='bottom-left'

  >
    <span>sdsdf</span>
    <span>face</span>
    <span>mail</span>
  </FabButton>

    <FabButton
      reverse={false}
      icon={'add'}
      position='center'
      type='circle'
    >
      <span>sdsdf</span>
      <span>face</span>
      <span>mail</span>
  </FabButton>

  <FabButton
    reverse={false}
    icon={'add'}
    position='top-right '
    type='vertical'
  >
    <span>sdsdf</span>
    <span>face</span>
    <span>mail</span>
  </FabButton>
</div>, document.getElementById('root'));
