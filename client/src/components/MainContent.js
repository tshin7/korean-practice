import React, { Component } from 'react';
import { Button, Card, Input } from 'antd';
const { TextArea } = Input;

const highlightColor = '#FFFF00'; // yellow
const noHighlightColor = '#FFFFFF'; // white
const text = '절에 가서 도 닦는 것만 도가 아니야. 사람과 부대끼면서 도를 닦으라 그래 나는. 왜냐면 그래야 좋은 거 나쁜 거 보면서 깨달음을 얻거든. 나쁜 사람을 만나고 ‘저 사람은 원래 나쁜사람이구나’ 인정하면 내 마음이 편해져. 그런데 ‘에이 저놈 보기도 싫어’ 이러면 내 속이 나빠져. 병 걸린다고. 나쁜 사람에 대한 미움을 왜 내 마음에 두고 살아. 왜 내가 내 속을 썩여. 좋은 것만 자꾸 받아들여야 해. 좋은 것이 쌓이면 금이 되어버려. 그리고 마음이 금이 되면 꽃이 펴. 그 꽃은 건 지지 않는 꽃이야. 내가 마음에 심어두면 항상 펴 있어. 사람이 왜 좋은 줄 알아? 수시로 꽃이 필 수 있잖아.';

class MainContent extends Component {
  constructor(props) {
    super(props);

    // create list of syllable block background colors. first one is yellow and rest are white
    // const backgroundColorList = [highlightColor, ...Array(text.length - 1).fill(noHighlightColor)];

    this.state = {
      textAreaValue: '',
      symbolIndex: 0,
      timeLeft: 60
    };

    this.timer = 0;
  }


  componentDidMount() {

  };

  // onTestButtonClick = () => {
  //   let highlightList = this.state.backgroundColorList;
  //   highlightList[1] = highlightColor;
  //   this.setState({
  //     backgroundColorList: highlightList
  //   });
  // };

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let timeLeft = this.state.timeLeft - 1;
    this.setState({
      timeLeft: timeLeft,
    });

    // Check if we're at zero.
    if (timeLeft === 0) {
      clearInterval(this.timer);
    }
  }

  handleTextAreaChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.value.slice(-1));
    const symbolIndex = this.state.symbolIndex;
    const typedSymbol = event.target.value.slice(-1);
    const currentlyHighlightedSymbol = text[symbolIndex];
    // if typed symbol matches currently highlighted symbol, move highlight ot next symbol or space
    if (typedSymbol === currentlyHighlightedSymbol) {
      this.setState({
        symbolIndex: symbolIndex + 1
      });
    }

    // update entire content of text area
    this.setState({
      textAreaValue: event.target.value
    });
  }

  render() {
    const timeLeft= this.state.timeLeft;

    let textStyled = text.split('').map((e, i) => {
      const symbolIndex = this.state.symbolIndex;
      if (i === symbolIndex) {
        return (
          <span id={ 'syllableBlock_' + i } key={ i } style={{ backgroundColor: highlightColor }}>{ e }</span>
        );
      }
      else {
        return (
          <span id={ 'syllableBlock_' + i } key={ i } style={{ backgroundColor: noHighlightColor }}>{ e }</span>
        );
      }

    });

    return (
      <div>
        <button onClick={this.startTimer}>Start</button>
        <Card style={{ width: 100, textAlign: 'center', fontSize: '2em' }}>
          <p>{ timeLeft }</p>
        </Card>
        <div style={{ fontSize: '2em' }}>{ textStyled }</div>
        <TextArea
          rows={8}
          value={this.state.textAreaValue}
          onChange={this.handleTextAreaChange}
          style={{ fontSize: '2em' }}
        />
        <Button type="primary" onClick={ this.onTestButtonClick }>Test Button</Button>
      </div>
    );
  };
}

export default MainContent;
