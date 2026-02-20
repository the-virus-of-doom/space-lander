import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { MainMenu } from '../game/scenes/MainMenu';

import { EventBus } from '../game/EventBus';
import { Game } from '../game/scenes/Game';
import { Win } from '../game/scenes/Win';
import { GameOver } from '../game/scenes/GameOver';

@Component({
    selector: 'app-root',
    imports: [PhaserGame],
    templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
    public canReturnToMenu = false;
    public canResetLevel = false;
    public canStartGame = true;

    public debug = false;

    // This is a reference from the PhaserGame component
    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    ngAfterViewInit() {
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
            this.canReturnToMenu = scene.scene.key !== 'MainMenu';
            this.canStartGame = scene.scene.key === 'MainMenu';
            this.canResetLevel = scene.scene.key === 'Game';

            // show debug options when physics debug is enabled
            // (or if config exists)
            if (scene.game.config.physics.matter?.debug) {
                this.debug = true;
            } else {
                this.debug = false;
            }
        });
    }

    // These methods are called from the template
    public returnToMenu() {
        if (this.phaserRef.scene) {
            const scene = this.phaserRef.scene as Game | Win | GameOver;
            scene.changeScene();
        }
    }

    public resetLevel() {
        if (this.phaserRef.scene) {
            const scene = this.phaserRef.scene as Game;
            scene.resetLevel();
        }
    }
    public startGame() {
        if (this.phaserRef.scene) {
            const scene = this.phaserRef.scene as MainMenu;
            scene.startGame();
        }
    }
    public forceWin() {
        if (this.phaserRef.scene) {
            const scene = this.phaserRef.scene as Game;
            scene.levelWin();
        }
    }
}
