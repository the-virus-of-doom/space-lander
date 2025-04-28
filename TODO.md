# TODO

## Physics

-   [ ] add rotational inertia
    -   [ ] want to apply rotational force, not set rotational speed
-   [ ] fine-tune physics interactions
    -   [ ] gravity
    -   [ ] friction
    -   [ ] thrust
        -   [ ] rotation speed / force

## Game Design

-   [x] Implement Fuel
-   [x] Implement Fuel pickups
-   [x] Win Scenario
    -   [x] add win / next level logic
    -   [x] add final win screen
-   [ ] Lose Scenario
    -   [x] Landing too hard
    -   [ ] Crashing (hit top (or sides?) on collider)
        -   add secondary collider at top (see photoshop)
    -   [x] Out of Fuel
        -   [x] fail when no fuel and not moving
    -   [ ] add restart level logic
    -   [ ] do we want global lives?
        -   [ ] hardcode mode with limited number of lives for entire game?

## Art and Animations

-   [x] add animations for lander
    -   [x] main thrust
    -   [x] rotate CW
    -   [x] rotate CCW
-   [x] create explosion sprite
-   [x] create fuel sprite
-   [ ] add sfx
    -   [ ] explode
    -   [ ] fuel pickup
    -   [ ] menu select
    -   [ ] successful landing
-   [ ] add background music

## UI

-   [x] recenter loading screen and loading bar
-   [ ] update Angular side with game state buttons
    -   [ ] restart level
        -   fix transparency issue on level restart
    -   [x] return to menu
        -   disable in menu
    -   [x] remove demo buttons
-   [ ] add game over reason to Game Over screen

## Level Design

-   [x] Widen Start / End Platforms
-   [x] Add regular ground platform
-   [x] End Platform Trigger
    -   [ ] only include arrow in tutorial level
-   [ ] Tutorial level
-   [ ] other levels

## API

-   [ ] decide on what API to use
    -   load levels from server? (own server)
    -   Mars time of day API? (own server)
    -   use NASA API for weather data? (NASA)
-   [ ] implement API
