import React, { Component } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

class MainContent extends Component {
  render() {
    const text = '절에 가서 도 닦는 것만 도가 아니야. 사람과 부대끼면서 도를 닦으라 그래 나는. 왜냐면 그래야 좋은 거 나쁜 거 보면서 깨달음을 얻거든. 나쁜 사람을 만나고 ‘저 사람은 원래 나쁜사람이구나’ 인정하면 내 마음이 편해져. 그런데 ‘에이 저놈 보기도 싫어’이러면 내 속이 나빠져. 병 걸린다고. 나쁜 사람에 대한 미움을 왜 내 마음에 두고 살아. 왜 내가 내 속을 썩여. 좋은 것만 자꾸 받아들여야 해. 좋은 것이 쌓이면 금이 되어버려. 그리고 마음이 금이 되면 꽃이 펴. 그 꽃은 건 지지 않는 꽃이야. 내가 마음에 심어두면 항상 펴 있어. 사람이 왜 좋은 줄 알아? 수시로 꽃이 필 수 있잖아.';
    let textStyled = text.split('').map(e => {

    });

    return (
      <div>
        <div style={{ fontSize: '2em' }}>{ text }</div>
        <TextArea rows={8} style={{ fontSize: '2em' }} />
      </div>
    );
  }
}

export default MainContent;
