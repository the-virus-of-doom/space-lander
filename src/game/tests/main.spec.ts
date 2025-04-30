import * as configDev from '../main';
import * as configProd from '../main.prod';

describe('Config', () => {
    let testConfigDev = configDev.config;
    let testConfigProd = configProd.config;

    it('config should be identical besides physics.matter.debug value', () => {
        expect(testConfigDev).not.toEqual(testConfigProd);
        if (testConfigProd.physics?.matter) {
            testConfigProd.physics.matter.debug = true;
        }
        expect(testConfigDev).toEqual(testConfigProd);
    });
});
