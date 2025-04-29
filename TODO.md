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
-   [ ] Lose Scenarios
    -   [x] Landing too hard
    -   [ ] Crashing (hit top (or sides?) on collider)
        -   add secondary collider at top (see photoshop)
    -   [x] Out of Fuel
        -   [x] fail when no fuel and not moving
    -   [x] add restart level logic

## Art and Animations

-   [x] add animations for lander
    -   [x] main thrust
    -   [x] rotate CW
    -   [x] rotate CCW
-   [x] create explosion sprite
-   [x] create fuel sprite
-   [ ] create and add vertical ground sprite
-   [ ] add sfx
    -   [ ] explode
    -   [ ] fuel pickup
    -   [ ] menu select
    -   [ ] successful landing
-   [ ] add background music
-   [ ] create and add menu logo

## UI

-   [x] recenter loading screen and loading bar
-   [x] update Angular side with game state buttons
    -   [x] restart level
        -   fix transparency issue on level restart
    -   [x] return to menu
        -   disable in menu
    -   [x] remove demo buttons
-   [x] add game over reason to Game Over screen
-   [x] store total extra fuel for final win screen
    -   on win, add remaining fuel to global variable that is displayed on Win screen

## Level Design

-   [x] Widen Start / End Platforms
-   [x] Add regular ground platform
-   [x] End Platform Trigger
    -   [ ] only include arrow in tutorial level?
-   [ ] Tutorial level
-   [ ] other levels
    -   [x] Zig-Zag
    -   [ ] Thread The Needle (horizontal platforms)
    -   [ ] Flappy Lander (vertical platforms)
    -   [ ] Over and Under (loop/spiral into cave)

## API

-   [ ] decide on what API to use
    -   load levels from server? (own server)
    -   Mars time of day API? (own server)
    -   use NASA API for weather data? (NASA)
-   [ ] implement API
