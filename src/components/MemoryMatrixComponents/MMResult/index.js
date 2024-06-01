import {Line} from 'rc-progress'

import './index.css'

const MMResult = props => {
  const {level, onClickPlayAgain} = props
  const percentage = (level * 100) / 15
  return (
    <div className="progress-bar-bg">
      <div className="progress-bar-emoji-container">
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000742/05_Pokerface_xnvjfb.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000801/07_Grimmace_n4lx7r.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000716/01_Smile_wuwllh.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000762/03_Optimistic_wzbf7s.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000826/04_Grin_rmlxkc.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000848/05_Laugh_qatkkp.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000870/02_Happy_fciroi.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000891/02_Like_a_boss_cjrvqq.png"
          alt="emoji"
          className="progress-bar-emoji"
        />
      </div>
      <Line
        percent={percentage}
        strokeWidth={4}
        strokeColor="blue"
        className="progress-bar"
      />
      <div className="levels-container">
        <p className="level-heading">level 1</p>
        <p className="level-heading">level 5</p>
        <p className="level-heading">level 10</p>
        <p className="level-heading">level 15</p>
      </div>
      <h1 className="congratulations-heading">Congratulations</h1>
      <p className="description-heading">You have reached level {level}</p>
      <button
        type="button"
        className="play-again-button"
        onClick={onClickPlayAgain}
      >
        Play Again
      </button>
    </div>
  )
}

export default MMResult
