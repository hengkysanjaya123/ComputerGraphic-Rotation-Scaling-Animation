function scaleObject(object, scaleNum){
  object.scaling.x = scaleNum;
  object.scaling.y = scaleNum;
  object.scaling.z = scaleNum;
}

function setRotation(obj, scene, object) {
  object.rotation = new BABYLON.Vector3(0, Math.PI / -2, 0, 0);
  var loop = new BABYLON.Animation(
    "loop",
    "rotation.y",
    50,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
  );
  var loopKeys = [];
  loopKeys.push({
    frame: 0,
    value: 0,
  });
  loopKeys.push({
    frame: 100,
    value: Math.PI,
  });
  loop.setKeys(loopKeys);
  obj.animations = [loop];
  scene.beginAnimation(obj, 50, 0, true);
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#render");
  const engine = new BABYLON.Engine(canvas, true);
  const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    scene.createDefaultLight();

    const camera = new BABYLON.ArcRotateCamera(
      "arcCamera",
      Math.PI / 4,
      Math.PI / 3,
      50,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    BABYLON.SceneLoader.ImportMesh(
      "",
      "obj/",
      "Lowpoly_Notebook_2.obj",
      scene,
      function (obj) {
        obj.forEach((object) => {
          scaleObject(object, 9);

          setRotation(obj, scene, object);
        });
      }
    );
    return scene;
  };
  const scene = createScene();
  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
