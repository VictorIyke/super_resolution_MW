export function pixelsRGBToYCbCr(red: number, green: number, blue: number, mode: string): number {
    let result = 0
    if (mode == "y") {
        result  = (0.299 * red +
                    0.587 * green +
                    0.114 * blue) / 255
    }else if (mode == "cb"){
        result = ((-0.168935) * red +
                    (-0.331665) * green +
                    0.50059 * blue) + 128
    }else if (mode == "cr") {
        result = ((0.499813 * red +
            (-0.418531) * green +
            (-0.081282) * blue) + 128)

    }
    
    return result
    
}

export function pixelsYCbCrToRGB(pixel: number, cb: number, cr: number) {
    const y = Math.min(Math.max((pixel * 255), 0), 255);

    const red = Math.min(Math.max((y + (1.4025 * (cr-0x80))), 0), 255);

    const green = Math.min(Math.max((y + ((-0.34373) * (cb-0x80)) +
                                          ((-0.7144) * (cr-0x80))), 0), 255);

    const blue = Math.min(Math.max((y + (1.77200 * (cb-0x80))), 0), 255);

    const intPixel =  {
        redPixel: red, 
        greenPixel: green,
        bluePixel: blue,
    }

    return intPixel
}