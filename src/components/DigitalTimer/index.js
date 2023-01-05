// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeLimitMinutes: 25, elapsedSeconds: 0}

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitMinutes, elapsedSeconds} = this.state
    const isTimeCompleted = elapsedSeconds === timeLimitMinutes * 60
    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        elapsedSeconds: prevState.elapsedSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeLimitMinutes, elapsedSeconds} = this.state
    const isTimeCompleted = elapsedSeconds === timeLimitMinutes * 60

    if (isTimeCompleted) {
      console.log('Time Completed')
      this.setState({elapsedSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.IntervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  clearTimeInterval = () => {
    clearInterval(this.IntervalId)
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState({
      isTimerRunning: false,
      timeLimitMinutes: 25,
      elapsedSeconds: 0,
    })
  }

  getTimeInElapsedInSeconds = () => {
    const {timeLimitMinutes, elapsedSeconds} = this.state
    const remainingMinutes = timeLimitMinutes * 60 - elapsedSeconds

    const minutes = Math.floor(remainingMinutes / 60)
    const seconds = Math.floor(remainingMinutes % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseImgAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="time-controller-btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseImgAltText}
            className="startOrPauseIcon"
          />
          <p className="btnLabel">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          type="button"
          className="time-controller-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-icon"
          />
          <p className="btnLabel">Reset</p>
        </button>
      </div>
    )
  }

  onDecrementOfMinutes = () => {
    const {timeLimitMinutes, isTimerRunning} = this.state
    if (!isTimerRunning) {
      if (timeLimitMinutes > 1) {
        this.setState(prevState => ({
          timeLimitMinutes: prevState.timeLimitMinutes - 1,
        }))
      }
    }
  }

  onIncrementOfMinutes = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timeLimitMinutes: prevState.timeLimitMinutes + 1,
      }))
    }
  }

  renderSetTimerController = () => {
    const {timeLimitMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="setTimerControlContainer">
        <p className="setTimerLimitLabel">Set Timer limit</p>
        <div className="setTime-buttons-container">
          <button
            className="setTimeBtn"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onDecrementOfMinutes}
          >
            -
          </button>
          <p className="stateTime">{timeLimitMinutes}</p>
          <button
            className="setTimeBtn"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onIncrementOfMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const timeLabelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-bg-container">
            <div className="elapsed-timer-container">
              <h1 className="elapsedTime">
                {this.getTimeInElapsedInSeconds()}
              </h1>
              <p className="label-text">{timeLabelText}</p>
            </div>
          </div>
          <div className="time-control-container">
            {this.renderTimerController()}
            {this.renderSetTimerController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
