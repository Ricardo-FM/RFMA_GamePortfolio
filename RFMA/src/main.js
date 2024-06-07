import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue } from "./utils";

k.loadSprite("spritesheet", "./spritesheet.png", {
    slicex: 39,
    slicey: 31,
    anim: {
        "idle-down": 948,
        "walk-down": { from: 948, to: 951, loop: true, speed: 8 },
        "idle-side": 987,
        "walk-side": { from: 987, to: 990, loop: true, speed: 8 },
        "idle-up": 1026,
        "walk-up": { from: 1026, to: 1029, loop: true, speed: 8 },
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
    
    for (const layers of layers) {
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
                        displayDialogue("TODO", () => (player.isInDialogue = false));
                    });
                }
            }
        continue;
        }
    if(layers.name)
    }

});

//Specifies default  test 2
k.go("main");
