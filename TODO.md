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
-   [ ] Implement Fuel pickups
-   [ ] Win Scenario
    -   [ ] add win / next level logic
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
-   [ ] create fuel sprite

## UI

-   [x] recenter loading screen and loading bar

## Level Design

-   [x] Widen Start / End Platforms
-   [x] Add regular ground platform
-   [ ] End Platform Trigger
    -   [ ] include arrow in tutorial level
-   [ ] Tutorial level
-   [ ] other levels
