import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import Modal from 'react-modal'
import MMResult from '../MMResult'
import './index.css'

class MMGame extends Component {
  state = {
    gridSize: 0,
    highlightedBoxes: [],
    selectedBoxes: [],
    isClickable: false,
    modalIsOpen: false,
    level: 1,
    showResults: false,
  }

  componentDidMount() {
    this.initializeLevel()
  }

  initializeLevel = () => {
    const {level} = this.state
    const gridSize = level + 2 // Initial gridSize starts from 3
    const highlightedBoxes = this.generateHighlightedBoxes(gridSize)
    this.setState({
      gridSize,
      highlightedBoxes,
      isClickable: false,
      selectedBoxes: [],
    })

    setTimeout(() => {
      this.setState({isClickable: true})
    }, gridSize * 1000)
  }

  generateHighlightedBoxes = gridSize => {
    const highlightedBoxes = []
    while (highlightedBoxes.length < gridSize) {
      const randomIndex = Math.floor(Math.random() * gridSize * gridSize)
      if (!highlightedBoxes.includes(randomIndex)) {
        highlightedBoxes.push(randomIndex)
      }
    }
    return highlightedBoxes
  }

  handleCellClick = index => {
    const {isClickable, highlightedBoxes, selectedBoxes} = this.state

    if (!isClickable) return

    const isHighlighted = highlightedBoxes.includes(index)
    const updatedSelectedBoxes = [...selectedBoxes, index]

    if (isHighlighted) {
      this.setState({selectedBoxes: updatedSelectedBoxes})

      if (updatedSelectedBoxes.length === highlightedBoxes.length) {
        this.advanceToNextLevel()
      }
    } else {
      this.setState({showResults: true})
    }
  }

  advanceToNextLevel = () => {
    this.setState(
      prevState => ({
        level: prevState.level + 1,
      }),
      this.initializeLevel,
    )
  }

  handlePlayAgain = () => {
    this.setState(
      {
        level: 1,
        showResults: false,
      },
      this.initializeLevel,
    )
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {
      gridSize,
      highlightedBoxes,
      selectedBoxes,
      isClickable,
      level,
      showResults,
      modalIsOpen,
    } = this.state

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
            onClick={this.openModal}
          >
            Rules
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            className="mm-game-modal"
            overlayClassName="mm-game-overlay"
          >
            <div className="mm-game-rules-modal-content-container">
              <button
                type="button"
                onClick={this.closeModal}
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
          <MMResult level={level} onClickPlayAgain={this.handlePlayAgain} />
        ) : (
          <div>
            <h1 className="mm-game-heading">Memory Matrix</h1>
            <p className="mm-levels">Level - {level}</p>
            <table className="grid">
              <tbody>
                {Array.from({length: gridSize}).map((_, rowIndex) => (
                  <tr>
                    {Array.from({length: gridSize}).map((__, colIndex) => {
                      const cellIndex = rowIndex * gridSize + colIndex
                      const isHighlighted = highlightedBoxes.includes(cellIndex)
                      const isSelected = selectedBoxes.includes(cellIndex)
                      const testData = isHighlighted
                        ? 'highlighted'
                        : 'notHighlighted'
                      return (
                        <td>
                          <button
                            type="button"
                            className={`cell ${
                              isHighlighted ? 'highlighted' : ''
                            } ${isSelected ? 'selected' : ''}`}
                            onClick={() => this.handleCellClick(cellIndex)}
                            data-testid={`cell ${
                              isHighlighted ? 'highlighted' : 'notHighlighted'
                            }`}
                            data-test={testData}
                            disabled={!isClickable}
                          >
                            <span className="visually-hidden">
                              Click to select cell
                            </span>
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default MMGame
