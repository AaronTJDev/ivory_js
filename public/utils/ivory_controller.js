function Color (){
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.alpha = 1.0;
    this.colorText = `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
}

function Dimensions (){
    this.standard = {
        width : 0,
        height : 0
    }
    this.padding = {
        left:0,
        right:0,
        top:0,
        bottom:0
    },
    this.margin = {
        left:0,
        right:0,
        top:0,
        bottom:0
    },
    this.border = {
        left:0,
        right:0,
        top:0,
        bottom:0
    },
    this.mode = ['standard', 'padding',  'border', 'margin'];
}

function Controller(){
    this.dimensions = new Dimensions();
    this.color = new Color();
}