import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'

import EmojiGameRules from './components/EmojiGameComponents/EmojiGameRules'
import EmojiGame from './components/EmojiGameComponents/EmojiGame'

import RPSRules from './components/RockPaperScissorComponents/RPSRules'
import RockPaperScissors from './components/RockPaperScissorComponents/RPSGame'

import MMGameRules from './components/MemoryMatrixComponents/MMGameRules'
import MMGame from './components/MemoryMatrixComponents/MMGame'

import CFRules from './components/CardFlipMemoryGame/CFRules'
import CFGame from './components/CardFlipMemoryGame/CFGame'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/emoji-game" component={EmojiGameRules} />
    <Route exact path="/emoji-game-play" component={EmojiGame} />
    <Route exact path="/rock-paper-scissor" component={RPSRules} />
    <Route
      exact
      path="/rock-paper-scissor-play"
      component={RockPaperScissors}
    />
    <Route exact path="/memory-matrix" component={MMGameRules} />
    <Route exact path="/memory-matrix-play" component={MMGame} />
    <Route exact path="/card-flip-memory-game" component={CFRules} />
    <Route exact path="/card-flip-memory-game-play" component={CFGame} />
  </Switch>
)

export default App
