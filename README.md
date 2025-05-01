# Space Lander

Play now at [space-lander.vercel.app](https://space-lander.vercel.app/)

## Technologies Used

-   TypeScript
    -   JavaScript with types
-   Phaser.io
    -   Game Engine
-   Angular
    -   Website wrapper
-   Vercel
    -   Game hosting
    -   CI/CD
-   Deno
    -   Backend API hosting

## How to run

### Local development

Install dependencies

`npm install`

Show debug information and additional devtools

`npm run dev`

Use production configuration

`npm run prod`

Ensure dev/prod configuration consistency (`main.ts` and `main.prod.ts`)

`npm run test`

### Deployment

### GitHub Pages

`npm run build:prod`

### Vercel

`npm run build:vercel`

Project Settings:

Framework Preset: `Angular`

Build Command: `npm run build:vercel`

Output Directory: `dist/space-lander/browser`

Install Command: `npm install`

## Credits

Developed using Phaser's Angular Starter Template, available [here](https://github.com/phaserjs/template-angular).

Mars background image credit: NASA/JPL-Caltech/ASU

Read more about the image [here](https://mars.nasa.gov/mars2020/multimedia/raw-images/image-of-the-week/week-208).

Sound effects generated with [jsfxr](https://sfxr.me/)

### Tutorials used

-   [Making your first Phaser 3 Game](https://phaser.io/tutorials/making-your-first-phaser-3-game/part1) - Phaser
-   [Making Your First Phaser 3 Game in TypeScript](https://www.youtube.com/playlist?list=PLNwtXgWIx3ri6Bbouc4uUGk2bdDzNA1eP) - [ourcade](https://www.youtube.com/@ourcadetv)
