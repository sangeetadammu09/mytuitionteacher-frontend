import { CommonLayoutModule } from "./common-layout.module";

describe('LayoutModule', () => {
    let layoutModule: CommonLayoutModule;

    beforeEach(() => {
        layoutModule = new CommonLayoutModule();
    });

    it('should create an instance', () => {
        expect(layoutModule).toBeTruthy();
    });
});
