import { Button, Input, Modal } from 'antd';
import React, { Component } from 'react';
const { TextArea } = Input;

const yellowColor = '#FFFF00'; // yellow
const whiteColor = '#FFFFFF'; // white
const grayColor = '#E8E8E8'; // gray

// korean text for typing practice
const text = '절에 가서 도 닦는 것만 도가 아니야. 사람과 부대끼면서 도를 닦으라 그래 나는. 왜냐면 그래야 좋은 거 나쁜 거 보면서 깨달음을 얻거든. 나쁜 사람을 만나고 ‘저 사람은 원래 나쁜사람이구나’ 인정하면 내 마음이 편해져. 그런데 ‘에이 저놈 보기도 싫어’ 이러면 내 속이 나빠져. 병 걸린다고. 나쁜 사람에 대한 미움을 왜 내 마음에 두고 살아. 왜 내가 내 속을 썩여. 좋은 것만 자꾸 받아들여야 해. 좋은 것이 쌓이면 금이 되어버려. 그리고 마음이 금이 되면 꽃이 펴. 그 꽃은 건 지지 않는 꽃이야. 내가 마음에 심어두면 항상 펴 있어. 사람이 왜 좋은 줄 알아? 수시로 꽃이 필 수 있잖아.';
// total time given for typing practice
const timeGiven = 5;

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numKeystrokes: 0,
      timerStarted: false,
      textAreaValue: '',
      symbolIndex: 0,
      timeLeft: timeGiven,
      modalVisible: false,
      resetButtonDisabled: true
    };

    // timer for typing session
    this.timer = 0;
  }

  // set cursor focus in textarea
  focus = () => {
    this.textInput.focus();
  }

  // key up in any part of page
  handleDocKeyUp = (event) => {
    // set focus in textarea
    this.focus();
  }

  componentWillMount() {
    document.addEventListener("keyup", this.handleDocKeyUp);
  };

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleDocKeyUp);
  };

  // start timer by using setInterval
  startTimer = () => {
    // setInterval on page load, when this.timer is set to 0
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // update timer every second
  countDown = () => {
    // Set focus on textarea
    this.focus();
    // Remove one second, set state so a re-render happens.
    let timeLeft = this.state.timeLeft - 1;
    this.setState({
      timeLeft: timeLeft,
    });

    // Check if we're at zero.
    if (timeLeft === 0) {
      clearInterval(this.timer);
      // show modal after timer hits 0
      this.showModal();
    }
  }

  resetButton = () => {
    // clear session timer
    clearInterval(this.timer);

    // set session timer to 0
    this.timer = 0;

    // reset all states
    this.setState({
      numKeystrokes: 0,
      timerStarted: false,
      textAreaValue: '',
      symbolIndex: 0,
      timeLeft: timeGiven,
      modalVisible: false,
      resetButtonDisabled: true
    });
  }

  // handler for text area
  handleTextAreaChange = (event) => {
    // start timer if it hasn't started yet when user types in text area
    let timerStarted = this.state.timerStarted;
    if (!timerStarted) {
      this.startTimer();
      timerStarted = true;
    };

    // entire text in textarea
    const entireTextAreaInput = event.target.value;
    // index of symbol user is up to
    let symbolIndex = this.state.symbolIndex;
    // currentlyTypedSymbol is the symbol the user is current typing
    const currentlyTypedSymbol = entireTextAreaInput.slice(-1);
    const correctMatchingSymbol = text[symbolIndex];

    // if user types in correct symbol, advance symbolIndex by 1 to move highlight to next symbol
    if (currentlyTypedSymbol === correctMatchingSymbol) {
      symbolIndex++;
    }

    // update states
    this.setState({
      timerStarted: timerStarted,
      textAreaValue: entireTextAreaInput,
      symbolIndex: symbolIndex,
      resetButtonDisabled: false
    });
  }

  // set modal visibliity to true
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }

  // set modal visiblity to false on OK click
  handleOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  // set modal visiblity to false on Cancel click
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    // index of symbol that user is currently up to
    const symbolIndex = this.state.symbolIndex;
    // Get string slice of correctly typed text
    const correctlyTypedTextSlice = text.slice(0, symbolIndex);
    // use String normalize to split hangul into individual gamo chars (ㄱ, ㄴ, ㄷ, ㅎ, etc...)
    const numKeystrokes = correctlyTypedTextSlice.normalize("NFD").length;
    const timeLeft = this.state.timeLeft;
    const wordsTyped = numKeystrokes / 5;

    const textAreaValue = this.state.textAreaValue;
    const textAreaValueLength = textAreaValue.length;

    let textStyled = text.split('').map((e, i) => {
      // highlight the symbol that the user is on
      if (i === symbolIndex) {
        return (
          <span id={ 'syllableBlock_' + i } key={ i } style={{ backgroundColor: yellowColor }}>{ e }</span>
        );
      }
      else if (i > symbolIndex) {
        // color background white for chars ahead of user
        return (
          <span id={ 'syllableBlock_' + i } key={ i } style={{ backgroundColor: whiteColor }}>{ e }</span>
        );
      }
      else {
        // color background gray if less than symbolIndex
        return (
          <span id={ 'syllableBlock_' + i } key={ i } style={{ backgroundColor: grayColor }}>{ e }</span>
        );
      }

    });

    // calculate typing speed
    const timePassed = timeGiven - timeLeft;
    const speed = (wordsTyped / timePassed * 60) | 0;

    return (
      <div>
        <div style={{ fontSize: '2em' }}>Start typing to begin</div>
        <Button disabled={this.state.resetButtonDisabled} onClick={this.resetButton}>Reset</Button>
        <div style={{ fontSize: '1.5em' }}>Time Left: { timeLeft }</div>
        <div style={{ fontSize: '1.5em' }}>Key Strokes: { numKeystrokes }</div>
        <div style={{ fontSize: '1.5em' }}>Words Typed: { wordsTyped }</div>
        <div style={{ fontSize: '1.5em' }}>Speed: { speed } WPM</div>
        <div style={{ fontSize: '2em' }}>{ textStyled }</div>
        <TextArea
          rows={8}
          hiddden='hidden'
          value={this.state.textAreaValue}
          onKeyUp={this.keyPress}
          onChange={this.handleTextAreaChange}
          ref={input => this.textInput = input }
          /* Hide textarea off screen */
          style={{ fontSize: '2em', userSelect: 'none', position: 'absolute', left: '-999em' }}
        />
        { /* <Button type="primary" onClick={ this.showModal }>Open</Button> */ }
        <Modal
          title="Typing Summary"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ fontSize: '1.5em' }}>Key Strokes: { numKeystrokes }</div>
          <div style={{ fontSize: '1.5em' }}>Words Typed: { wordsTyped }</div>
          <div style={{ fontSize: '1.5em' }}>Speed: { speed } WPM</div>
        </Modal>
      </div>
    );
  };
}

export default MainContent;
