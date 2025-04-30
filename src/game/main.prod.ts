import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Win } from './scenes/Win';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

// IMPORTANT: THE ONLY DIFFERENCE SHOULD BE `physics.matter.debug`
export const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    input: {
        keyboard: true,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { x: 0, y: 1 },
            debug: false,
            setBounds: {
                x: 0,
                y: 0,
                width: 800,
                height: 600,
                thickness: 1024,
                left: true,
                right: true,
                top: true,
                bottom: true,
            },
        },
    },
    pixelArt: true,
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver, Win],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
