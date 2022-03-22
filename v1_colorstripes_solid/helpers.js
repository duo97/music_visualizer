function creatGradientRect( w,h,s_hue,end_hue,brightness,saturation) {
    // if(!w){
    //     w=1;
    // }
    // if(!h){
    //     h=1;
    // }
    // console.log(Math.floor(parseFloat(w)),Math.floor(parseFloat(h)))
    let img=createImage(Math.floor(parseFloat(w))+2,Math.floor(parseFloat(h)));
    img.loadPixels();
    for (let i=0;i<img.width;i++){
        let c=color(s_hue+i/img.width*(end_hue-s_hue),saturation*0.8,brightness)
        for (let j=0;j<img.height;j++){
            img.set(i, j, c);

        }
    }
    img.updatePixels();
    return img

  }



  function creatGradientRectWithEdge( w,h,s_hue,end_hue,brightness) {

    edge_dif=(end_hue-s_hue)/3;
    s_hue+=edge_dif;
    end_hue-=edge_dif;

    let img=createImage(Math.floor(parseFloat(w))+2,Math.floor(parseFloat(h)));
    img.loadPixels();
    for (let i=0;i<img.width;i+=5){
        let c=color(s_hue+i/img.width*(end_hue-s_hue),255,brightness)
        for (let j=0;j<img.height;j++){
            img.set(i, j, c);
            img.set(i+1, j, c);
            img.set(i+2, j, c);
            img.set(i+3, j, c);
            img.set(i+4, j, c);

        }
    }
    img.updatePixels();
    return img

  }