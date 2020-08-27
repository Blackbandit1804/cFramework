import Scene from './Scene';

export default new class SceneManager {
    constructor() {
        this.Scene = new Scene();
    }

    start(name) {
        this.Scene.setup(name);
    }

    setSelectionView(entity, name) {
        this.Scene.setSelectionView(entity, name);
    }

    destroy() {
        this.Scene.destroy();
    }
}();