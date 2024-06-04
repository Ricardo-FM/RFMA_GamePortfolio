import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";

k.loadSprite("spritesheet", "./spritesheet.png", {
    slicex: 39,
    slicey: 31,
    anim: {
        "idle-down": 936,
        "walk-down": {from: 936, to: 939, loop: true, speed: 8},
        "idle-side": 975,
        "walk-side": { from: 975, to : 978, loop: true, speed: 8},
        "idle-up": 1014,
        "walk-up": { from: 1014, to : 1017, loop: true, speed: 8}
    },
});

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map.png")).json();
    const layers = mapData.layers;

    const map = k.make([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
    const player = k.make([
        k.sprite("spritesheet", {anime: "idle-down"}), 
        k.area({
            shape:new k.rect(k.vec2(0, 3), 10, 10),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(scaleFactor),
        {
            speed: 250,
            direction: "down",
            isInDialogue: false,
        },
        //Tag to check for collisions, used with on collide function
        "player",
    ]);
    
    for (const layers of layers)
        if (layers.name == "boundaries")
            for (const boundary of layers.objects) {
                map.add([
                    k.area({
                      shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    }),
                    k.body({ isStatic: true }),
                    k.pos(boundary.x, boundary.y),
                    boundary.name,
                ])
                if (boundary.name) {
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true;
                        displayDialogue(
                        dialogueData[boundary.name],
                        () => (player.isInDialogue = false)
                        );
                    });
                }
            }
});

//Specifies default scene
k.go("main");