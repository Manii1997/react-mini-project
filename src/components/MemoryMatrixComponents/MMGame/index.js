import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import Modal from 'react-modal'
import './index.css'

import MMResult from '../MMResult'

const oneLevelArray = ['', '', '']

class MMGame extends Component {
  state = {
    level: 1,
    highlightedCells: [{}],
    gridSize: 3,
    levelArray: oneLevelArray,
    clickedCells: [{}],
    showResults: false,
  }

  componentDidMount() {
    this.generateGrid()
  }

  onClickPlayAgain = () => {
    this.setState({
      level: 1,
      highlightedCells: [],
      clickedCells: [],
      showResults: false,
    })
    this.generateGrid()
  }

  onClickOpenModal = () => {
    this.setState({modalIsOpen: true})
  }

  onClickCloseModal = () => {
    this.setState({modalIsOpen: false})
  }

  generateGrid = () => {
    const {gridSize} = this.state
    const newHighlightedCells = []
    // eslint-disable-next-line
    for (let i = 0; i < gridSize; i = i + 1) {
      const randomRow = Math.floor(Math.random() * gridSize)
      const randomCol = Math.floor(Math.random() * gridSize)
      newHighlightedCells.push({row: randomRow, col: randomCol})
    }
    this.setState({highlightedCells: newHighlightedCells})
    setTimeout(() => {
      this.setState({highlightedCells: [{}]})
    }, 5000) // Adjust time here (5 seconds)
  }

  nextLevel = () => {
    this.setState(prevState => ({
      level: prevState.level + 1,
      levelArray: [...prevState.levelArray, ''],
      gridSize: prevState.gridSize + 1,
    }))
    this.componentDidMount()
  }

  currentLevel = () => {
    this.setState({
      level: 1,
      levelArray: oneLevelArray,
      gridSize: 3,
    })
    this.componentDidMount()
  }

  evaluate = (clickedCells, highlightedCells) =>
    highlightedCells.every(highlightedCell =>
      clickedCells.some(
        clickedCell =>
          clickedCell.row === highlightedCell.row &&
          clickedCell.col === highlightedCell.col,
      ),
    )

  handleCellClick = (row, col) => {
    const {clickedCells, highlightedCells, level} = this.state
    const clickedCell = {row, col}
    const newClickedCells = [...clickedCells, clickedCell]

    if (highlightedCells.length === 0) {
      return
    }

    if (newClickedCells.length === level + 2) {
      if (this.evaluate(newClickedCells, highlightedCells)) {
        if (level === 15) {
          this.setState({showResults: true})
        } else {
          this.nextLevel()
        }
      } else {
        this.setState({showResults: true})
      }
    } else {
      this.setState({
        clickedCells: newClickedCells,
      })
    }
  }

  render() {
    const {highlightedCells, clickedCells, levelArray, modalIsOpen} = this.state
    const {level, showResults} = this.state

    return (
      <div className="mm-game-main-container">
        <div className="mm-game-back-btn-container">
          <Link to="/memory-matrix" className="back-btn-link">
            <button type="button" className="mm-game-back-btn">
              <BiArrowBack />
              Back
            </button>
          </Link>
          <button
            type="button"
            className="mm-game-pop-up-rule"
            onClick={this.onClickOpenModal}
          >
            Rules
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.onClickCloseModal}
            className="mm-game-modal"
            overlayClassName="mm-game-overlay"
          >
            <div className="mm-game-rules-modal-content-container">
              <button
                type="button"
                onClick={this.onClickCloseModal}
                className="mm-game-close-btn"
                data-testid="close"
              >
                <CgClose />
              </button>
              <h1 className="mm-game-sub-heading-popup">Rules</h1>
              <div className="mm-game-rules-popup">
                <ul>
                  <li>
                    In each level of the Game, Users should be able to see the
                    Grid with (N X N) size starting from 3 and the grid will
                    highlight N cells in Blue, the N highlighted cells will be
                    picked randomly.
                  </li>
                  <li>
                    The highlighted cells will remain N seconds for the user to
                    memorize the cells. At this point, the user should not be
                    able to perform any action.
                  </li>
                  <li>
                    After N seconds, the grid will clear the N highlighted
                    cells.
                  </li>
                  <li>
                    At N seconds, the user can click on any cell. Clicking on a
                    cell that was highlighted before it will turn blue. Clicking
                    on the other cells that were not highlighted before then
                    will turn to red.
                  </li>
                  <li>
                    The user should be promoted to the next level if they guess
                    all N cells correctly in one attempt.
                  </li>
                  <li>
                    The user should be taken to the results page if the user
                    clicks on the wrong cell.
                  </li>
                  <li>
                    If the user completed all the levels, then the user should
                    be taken to the results page.
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        {showResults ? (
          <MMResult level={level} onClickPlayAgain={this.onClickPlayAgain} />
        ) : (
          <div>
            <h1 className="mm-game-heading">Memory Matrix</h1>
            <p className="mm-levels">Level - {level}</p>
            <table className="grid">
              {levelArray.map((eachRow, rowIndex) => (
                <tr>
                  {levelArray.map((each, colIndex) => (
                    <td
                      className={`cell ${
                        highlightedCells.some(
                          cell =>
                            cell.row === rowIndex && cell.col === colIndex,
                        )
                          ? 'highlighted'
                          : ''
                      }${
                        clickedCells.some(
                          cell =>
                            cell.row === rowIndex && cell.col === colIndex,
                        )
                          ? 'clicked'
                          : ''
                      }`}
                      onClick={() => this.handleCellClick(rowIndex, colIndex)}
                    >
                      {}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default MMGame
