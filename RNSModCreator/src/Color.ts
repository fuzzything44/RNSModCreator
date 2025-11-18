class Color {
    static RED = new Color(0xFF, 0, 0);
    static GREEN = new Color(0, 0xFF, 0);
    static BLUE = new Color(0, 0, 0xFF);

    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        if (red > 255 || red < 0) {
            throw new Error("Red value must be 0-255");
        }
        if (green > 255 || green < 0) {
            throw new Error("Green value must be 0-255");
        }
        if (blue > 255 || blue < 0) {
            throw new Error("Blue value must be 0-255");
        }
    }


    toString(): string {
        return "#" + (this.red * 256 * 256 + this.green * 256 + this.blue).toString(16).toUpperCase();
    }
 
}

export default Color;