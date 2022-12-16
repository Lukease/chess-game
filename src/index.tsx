import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/Arena'
import {GameService, MovingService} from './game/suppliers'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const gameService = new GameService()
const movingService = new MovingService()
root.render(
    <Arena
    gameService={gameService}
    movingService={movingService}
    />
)

reportWebVitals()
