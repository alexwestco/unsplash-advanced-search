function addLightnesses(){

    var imgs = Array.prototype.slice.call(images)

    for(i=0; i<imgs.length; i++){

            
            if(imgs[i].getAttribute('lightness') == null){
                try {
                    isItDark(imgs[i], function(darkornot) {
                        //console.log(darkornot)
                    });
                }
                catch(err) {
                    //console.log(err.message);
                }

            }else{
                //console.log(imgs[i].getAttribute('lightness'))
            }
            
        }
}

function isItDark(image,callback) {
    imageSrc = image.srcset.split(' 100w')[0]
    var fuzzy = 0.1;
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    img.crossOrigin = "anonymous";
    document.body.appendChild(img);

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b, max_rgb;
        var light = 0, dark = 0;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            max_rgb = Math.max(Math.max(r, g), b);
            if (max_rgb < 128)
                dark++;
            else
                light++;
        }

        var dl_diff = ((light - dark) / (this.width*this.height));

        // Remote img from DOM
        img.parentNode.removeChild(img);

        if (dl_diff + fuzzy < 0){
            image.setAttribute("lightness", "dark")
            image.innerText = 'DARKK BOY'
            callback(true); /* Dark. */
        }else{
            image.setAttribute("lightness", "light")
            image.innerText = 'LIGHT BOY'
            callback(false);  /* Not dark. */
        }
    }
}

function filter(arg){    
    if(arg == 'Orientation: Any'){

        for(i=0; i<images.length; i++){
            images[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block"
        }

    }else if(arg == 'Orientation: Portrait'){

        for(i=0; i<images.length; i++){
            width = images[i].width
            height = images[i].height
            
            if(width > height){
                images[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
            }else{
                images[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block"
            }

        }

    }else if(arg == 'Orientation: Landscape'){

        for(i=0; i<images.length; i++){
            width = images[i].width
            height = images[i].height
            
            if(width < height){
                images[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
            }else{
                images[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block"
            }

        }

    }else if(arg == 'Luminance: Any'){

        for(i=0; i<images.length; i++){
            images[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block"
        
        }

    }else if(arg == 'Luminance: Light'){

        var imgs = Array.prototype.slice.call(images)

        for(i=0; i<imgs.length; i++){

            //console.log(imgs[i].getAttribute('lightness'))
            if(imgs[i].getAttribute('lightness') == 'dark'){
                imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
            }else{
                imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block"
            }

        }

    }else if(arg == 'Luminance: Dark'){

        var imgs = Array.prototype.slice.call(images)

        for(i=0; i<imgs.length; i++){

            //console.log(imgs[i].getAttribute('lightness'))
            if(imgs[i].getAttribute('lightness') == 'light'){
                imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
            }else{
                imgs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block"
            }

        }

    }
}

function add_filters(){
    // Add filters
    parent = document.getElementsByTagName('h1')[0]
    current_results_page = document.getElementsByTagName('h1')[0].innerHTML

    a1 = document.createElement('a')
    a1.id = 'filterz'
    a1.innerText =  'Filters:'
    a1.style.color = 'black'
    a1.style.fontWeight = 400
    a1.style.fontSize = '16px'
    a1.style.marginLeft = '5px'
    a1.style.fontFamily = 'Helvetica Neue'

    a2 = document.createElement('BUTTON')
    a2.id = 'orientation_button'
    a2.innerText =  'Orientation: Any'
    a2.style.color = '#696969'
    a2.style.fontWeight = 400
    a2.style.fontSize = '16px'
    a2.style.marginLeft = '5px'
    a2.style.fontFamily = 'Helvetica Neue'

    a3 = document.createElement('BUTTON')
    a3.id = 'luminance_button'
    a3.innerText =  'Luminance: Any'
    a3.style.color = '#696969'
    a3.style.fontWeight = 400
    a3.style.fontSize = '16px'
    a3.style.marginLeft = '5px'
    a3.style.fontFamily = 'Helvetica Neue'

    parent.appendChild(a1)
    parent.appendChild(a2)
    parent.appendChild(a3)

    a2.onclick = function(){

        if(a2.innerText == 'Orientation: Any'){
            a2.innerText = 'Orientation: Portrait'
            // Run every 10 seconds
            filter('Orientation: Portrait')

        }else if(a2.innerText == 'Orientation: Portrait'){
            a2.innerText = 'Orientation: Landscape'
            filter('Orientation: Landscape')

        }else{
            a2.innerText = 'Orientation: Any'
            filter('Orientation: Any')
        }
        
    }

    a3.onclick = function(){

        if(a3.innerText == 'Luminance: Any'){
            a3.innerText = 'Luminance: Light'
            filter('Luminance: Light')
        
        }else if(a3.innerText == 'Luminance: Light'){
            a3.innerText = 'Luminance: Dark'
            filter('Luminance: Dark')
        
        }else{
            a3.innerText = 'Luminance: Any'
            filter('Luminance: Any')
        }

    }


}

function run(){
       
    // Check if filters are already added
    my_filter = document.getElementById('filterz')
    if(my_filter == null){
        add_filters()
    }

    addLightnesses()

    // Find all images
    //console.log(images.length)
    //console.log(images)

    
}

// Get the images
images = document.getElementsByClassName('_2zEKz')
orientation = 'Orientation: Both'
luminance = 'Luminance: Both'

setInterval(addLightnesses, 5000);

// Run every 10 seconds
run()
setInterval(run, 5000);