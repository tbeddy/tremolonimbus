# TremoloNimbus

## Outline
[TremoloNimbus](http://tremolonimbus.herokuapp.com/) is a SoundCloud clone built with Ruby on Rails for the backend and React for the frontend. It aims to replicate the features and general feel of SoundCloud.

## Features

Users can upload audio files which can be played with a continuous player, always running when using the site. Users can also directly change the current track's time by selecting the corresponding area of its player, either the player on the page or the continuous player at the bottom of the window. Figuring out the different requirements for each kind of player and having them effectively communicate while still remaining visually pleasing (and auditorily consistent) has been the most difficult challenge so far and the one I'm most proud to have engineered.

Picking different parts of the track to play:  
![Seeking demo](../media/seeking_demo.gif?raw=true)

Making and deleting a comment:  
![Commenting demo](../media/commenting_demo.gif?raw=true)

Navigating the site without losing the continuous player:  
![Continuous player demo](../media/continuous_player_demo.gif?raw=true)