# TremoloNimbus

## Outline
[TremoloNimbus](http://tremolonimbus.herokuapp.com/) is a SoundCloud clone built with Ruby on Rails for the backend, React/Redux for the frontend, and PostgreSQL for the database. It aims to replicate the features and general feel of SoundCloud.

## Features

Users can upload audio files which can be played with a continuous player, always running when using the site. Users can also directly change the current track's time by selecting the corresponding area of its player, either the player on the page or the continuous player at the bottom of the window.

Picking different parts of the track to play:  
![Seeking demo](../media/seeking_demo.gif?raw=true)

Making and deleting a comment:  
![Commenting demo](../media/commenting_demo.gif?raw=true)

Navigating the site without losing the continuous player:  
![Continuous player demo](../media/continuous_player_demo.gif?raw=true)

## Challenges

Figuring out the different requirements for each kind of player (in the stream, on its own page, and the continuous player at the bottom of the screen) and having them effectively communicate while still remaining visually pleasing (and auditorily consistent) has been the most difficult challenge so far and the one I'm most proud to have engineered.

Information about the current track is stored in local state in this format:
```
{
  id: 3,
  playing: true,
  volume: 0.5,
  looping: false,
  muted: false
}
```
Whenever a new track is loaded in the continuous player, its information is sent all across the frontend through the Redux state management library. Every player on the current page (either stream players or a single track page player) checks whether or not it contains the currently streaming track. If so, it rapidly updates the player's visuals using the JavaScript's `setInterval` function. I originally hoped to send the current time through Redux at a similar interval, but realized that Redux is not designed for such rapid state management and my app was taking a performance hit. I plan on further optimizing this process.