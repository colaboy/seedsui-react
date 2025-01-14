function updatePlayerId(rootDOM) {
  window._seedsui_videoplayer_player_ = window._seedsui_videoplayer_player_
    ? window._seedsui_videoplayer_player_ + 1
    : 1

  let playerId = `_seedsui_videoplayer_player_${window._seedsui_videoplayer_player_}`

  // Set id
  let player = rootDOM.querySelector('.videoplayer-page-player')
  if (player) {
    player.setAttribute('id', playerId)
  }

  return playerId
}

export default updatePlayerId
