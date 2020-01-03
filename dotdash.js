class Dot {
    constructor(x, y, map, hotbar) {
        this._x = x;
        this._y = y;
        this._recentSnap = {
            x: this._x,
            y: this._y
        };
        this._dashMeter = 20;
        this._hotbar = hotbar;
        this._map = map;
    }

    get dashMeter() { return this._dashMeter; }
    set dashMeter(value) { this._dashMeter = value; }
    
    get hotbar() { return this._hotbar; }
    set hotbar(value) { this._hotbar = value; }
    
    get map() { return this._map; }
    set map(value) { this._map = value; }

    get x() { return this._x; }
    set x(value) { this._x = value; }

    get y() { return this._y; }
    set y(value) { this._y = value; }

    get recentSnap() { return this._recentSnap; }
    set recentSnap(value) { this._recentSnap = value; } 

    move(x, y) {
        if (!keys['k'] || player.dashMeter == 0) {
            x = x * 8;
            y = y * 8;
        }

        this._x += x;
        this._y += y;

        if (this._x > 95 || this._x < 0 || this._y > 58 || this._y < 0) {
            var scrollX = 0;
            var scrollY = 0;
            if (this._x > 95) {
                this._x -= 96;
                scrollX++;
            }
            if (this._x < 0) {
                this._x += 96;
                scrollX--;
            }
            if (this._y > 58) {
                this._y -= 59;
                scrollY++;
            }
            if (this._y < 0) {
                this._y += 59;
                scrollY--;
            }
            this.map.scroll(scrollX, scrollY);
            this._x = Math.floor(this._x / 8) * 8 + 4;
            this._y = Math.floor(this._y / 8) * 8 + 4;
            this._recentSnap.x = this._x;
            this._recentSnap.y = this._y;
            this.render();
        }
        else if (ti81.pxTest(this._x, this._y)) {
            this._x -= x;
            this._y -= y;
        }
        else {
            ti81.pxOn(this._x, this._y);
            ti81.pxOff(this._x - x, this._y - y);
        }
    }

    detectDeath() {
        if (ti81.pxTest(this._x, this._y)) {
            this._x = this._recentSnap.x;
            this._y = this._recentSnap.y;
            this._dashMeter = 20;
        }
    }

    snap() {
        ti81.pxOff(this._x, this._y);
        this._x = Math.floor(this._x / 8) * 8 + 4;
        this._y = Math.floor(this._y / 8) * 8 + 4;
        this.detectDeath();
        this.render();
    }

    render() {
        ti81.pxOn(this._x, this._y);
    }
}

class Map {
    constructor(terrainHash, lookupArray, currentPos, sprites) {
        this._terrainHash = terrainHash;
        this._lookupArray = lookupArray;
        this._currentPos = currentPos;
        this._sprites = sprites;
        this._animationFrame = 0;
    }

    scroll(x, y) {
        this._animationFrame = 0;
        this._currentPos.x += x;
        this._currentPos.y += y;
        this.render();
    }

    render() {
        ti81.clearScreen();
        var currentTerrain = this._terrainHash[ this._lookupArray[ this._currentPos.y ][ this._currentPos.x ] ][0].slice();
        var currentSprites = this._terrainHash[ this._lookupArray[ this._currentPos.y ][ this._currentPos.x ] ][1][ this._animationFrame ];
        for (var xy = 0; xy < currentSprites.length; xy++) {
            var i = currentSprites[xy][1] * 12 + currentSprites[xy][0];
            currentTerrain[i] = currentSprites[xy][2]
        }
        for (var i = 0; i < currentTerrain.length; i++) {
            var x = i % 12;
            var y = (i - x) / 12;
            x = x * 8;
            y = y * 8;
            for (var j = 0; j < 64; j++) {
                var relativeX = j % 8;
                var relativeY = (j - relativeX) / 8;
                if (this._sprites[ currentTerrain[i] ][j]) {
                    ti81.pxOn(x + relativeX, y + relativeY);
                }
            }
        }
        player.hotbar.render(player.dashMeter);
    }

    moveSprites() {
        this._animationFrame++;
        if (this._animationFrame == this._terrainHash[ this._lookupArray[ this._currentPos.y ][ this._currentPos.x ] ][1].length) this._animationFrame = 0;
        this.render();
    }
}

class Hotbar {
    render(dashMeter) {
        for (var y = 56; y < 64; y++) {
            for (var x = 0; x < 96; x++) {
                ti81.pxOn(x,y);
            }
        }
        for (var y = 57; y < 63; y++) {
            for (var x = 1; x < 95; x++) {
                if (x != 23) ti81.pxOff(x,y);
            }
        }
        for (var x = 0; x < dashMeter; x++) {
            for (var y = 58; y <= 61; y++) {
                ti81.pxOn(x + 2, y);
            }
        }
    }

    update(dashMeter) {
        for (var x = 0; x < 20; x++) {
            for (var y = 58; y <= 61; y++) {
                if (x < dashMeter) { 
                    ti81.pxOn(x + 2, y); 
                }
                else {                 
                    ti81.pxOff(x + 2, y);
                }
            }   
        }
    }
}

let player = new Dot(44, 36, new Map(terrainHash, lookupArray, currentPos, sprites), new Hotbar());
player.map.render();
player.render();

setInterval(function() {
    player.map.moveSprites();
    player.detectDeath();
    player.render();
    if (keys['k'] && player.dashMeter != 0) { player.dashMeter--; }
    else if (!keys['k'] && !keys['w'] && !keys['a'] && !keys['s'] && !keys['d'] && player.dashMeter < 20) { player.dashMeter++; }
    if (player.dashMeter == 0) { player.snap(); }
    player.hotbar.update(player.dashMeter);
    ti81.render();
}, 200);

let keys = {};
onkeydown = onkeyup = function (e) {
    e = e || window.event;
    keys[e.key] = (e.type == "keydown");
    if (!keys['k']) { player.snap(); }
    if (e.type == "keydown") {
        var moveX = 0;
        var moveY = 0;
        switch (e.key) {
            case 'w':
                moveY -= 1;
            break;
            case 'a':
                moveX -= 1;
            break;
            case 's':
                moveY += 1;
            break;
            case 'd':
                moveX += 1;
            break;
        }
        player.move(moveX, moveY);
    }
    ti81.render();
}
