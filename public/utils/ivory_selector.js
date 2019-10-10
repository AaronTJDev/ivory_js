var socket = io('http://localhost:8000');
var selected = initialize();


var ivory = {
    sliders: {
        s1: socket.on('s1', function(slide){
            let color = selected.ivory.color;
            color.red = slide
            color.colorText = `rgba(${color.red},${color.green},${color.blue },${color.alpha})`;
            selected.style.backgroundColor = color.colorText;
        }),
        s2: socket.on('s2', function(slide){
            let color = selected.ivory.color;
            color.green = slide
            color.colorText = `rgba(${color.red},${color.green},${color.blue },${color.alpha})`;
            selected.style.backgroundColor = color.colorText;
        }),
        s3: socket.on('s3', function(slide){
            let color = selected.ivory.color;
            color.blue = slide
            color.colorText = `rgba(${color.red},${color.green},${color.blue },${color.alpha})`;
            selected.style.backgroundColor = color.colorText;
        }),
        s4: socket.on('s4', function(slide){
            let color = selected.ivory.color;
            color.alpha = slide
            color.colorText = `rgba(${color.red},${color.green},${color.blue },${color.alpha})`;
            selected.style.backgroundColor = color.colorText;
        })
    },
    encoders: {
        e1: socket.on('e1', function(encoder){
            if (encoder === 2){
                addElement();
            }

            let dimensions = selected.ivory.dimensions;
            let mode = dimensions.mode[0];

            if ( mode === "bootstrap"){
                let bootstrap = dimensions.bootstrap;
                let counter = bootstrap.counter;

                if (encoder === 1){
                    dimensions.bootstrap.counter += 1;
                    
                    if(counter % 6 === 0){
                        leftRotate(bootstrap.gridWidth);
                        gridDefine(document.deviceWidth, bootstrap.gridWidth[0], selected);
                    }
                } else if (encoder === 0) {
                    dimensions.bootstrap.counter -= 1
                    if (counter % 6 === 0){
                        rightRotate(bootstrap.gridWidth);
                        gridDefine(document.deviceWidth, bootstrap.gridWidth[0], selected);
                    }
                }
            } else if(mode === "standard"){
                if(encoder === 1){
                    dimensions[mode].height += 4;
                    selected.style.height = dimensions[mode].height + 'px';
                } else if(encoder === 0){
                    dimensions[mode].height -= 4;
                    selected.style.height = dimensions[mode].height + 'px';
                }
            } else if(mode === "padding"){
                if(encoder === 1){
                    dimensions[mode].top += 4;
                    console.log(dimensions[mode])
                    selected.style.paddingTop = dimensions[mode].top + 'px';
                } else if(encoder === 0){
                    dimensions[mode].top -= 4;
                    selected.style.paddingTop = dimensions[mode].top + 'px';
                }
            } else if(mode === "border"){
                
                if(encoder === 1){
                    dimensions[mode].top += 4;
                    selected.style.borderTop = dimensions[mode].top + 'px';
                } else if(encoder === 0){
                    dimensions[mode].top -= 4;
                    selected.style.borderTop = dimensions[mode].top + 'px';
                }
            } else if(mode === "margin"){
                if(encoder === 1){
                    dimensions[mode].top += 4;
                    selected.style.marginTop = dimensions[mode].top + 'px';

                } else if(encoder === 0){
                    dimensions[mode].top -= 4;
                    selected.style.marginTop = dimensions[mode].top + 'px';
                }
            }
        }),
        e2: socket.on('e2', function(encoder){
            if (encoder === 2){
                changeMode();
            }
        
            let dimensions = selected.ivory.dimensions;
            let mode = dimensions.mode[0];

            if(mode === "bootstrap"){
                if(encoder === 1){
                    dimensions[mode].height += 4;
                    selected.style.height = dimensions[mode].height + 'px';
                } else if(encoder === 0){
                    dimensions[mode].height -= 4;
                    selected.style.height = dimensions[mode].height + 'px';
                }
            } else if(mode === "standard"){
                if(encoder === 1){
                    dimensions[mode].width += 4;
                    selected.style.width = dimensions[mode].width + 'px';
                } else if(encoder === 0){
                    dimensions[mode].width -= 4;
                    selected.style.width = dimensions[mode].width + 'px';
                }
            } else if(mode === "padding"){
                if(encoder === 1){
                    dimensions[mode].right += 4;
                    selected.style.paddingRight = dimensions[mode].right + 'px';
                } else if(encoder === 0){
                    dimensions[mode].right -= 4;
                    selected.style.paddingRight = dimensions[mode].right + 'px';
                }
            } else if(mode === "border"){
                if(encoder === 1){
                    dimensions[mode].right += 4;
                    selected.style.borderRight = dimensions[mode].right + 'px';
                } else if(encoder === 0){
                    dimensions[mode].right -= 4;
                    selected.style.borderRight = dimensions[mode].right + 'px';
                }
            } else if(mode === "margin"){
                if(encoder === 1){
                    dimensions[mode].right += 4;
                    selected.style.marginRight = dimensions[mode].right + 'px';
                } else if(encoder === 0){
                    dimensions[mode].right -= 4;
                    selected.style.marginRight = dimensions[mode].right + 'px';
                }
            }
        }),
        e3: socket.on('e3', function(encoder){
            if (encoder === 2){
                selectPrev();
            }

            let dimensions = selected.ivory.dimensions;
            let mode = dimensions.mode[0];


            if(mode === "padding"){
                if(encoder === 1){
                    dimensions[mode].bottom += 4;
                    selected.style.paddingBottom = dimensions[mode].bottom + 'px';
                } else if(encoder === 0){
                    dimensions[mode].bottom -= 4;
                    selected.style.paddingBottom = dimensions[mode].bottom + 'px';
                }
            } else if(mode === "border"){
                if(encoder === 1){
                    dimensions[mode].bottom += 4;
                    selected.style.borderBottom = dimensions[mode].bottom + 'px';
                } else if(encoder === 0){
                    dimensions[mode].bottom -= 4;
                    selected.style.borderBottom = dimensions[mode].bottom + 'px';
                }
            } else if(mode === "margin"){
                if(encoder === 1){
                    dimensions[mode].bottom += 4;
                    selected.style.marginBottom = dimensions[mode].bottom + 'px';
                } else if(encoder === 0){
                    dimensions[mode].bottom -= 4;
                    selected.style.marginBottom = dimensions[mode].bottom + 'px';
                }
            } else if(mode === "standard"){
                //if(encoder === 1){
                //    selectNext();
                //} else if(encoder === 0){
                //    selectPrev();
                //}
            }
        }),
        e4: socket.on('e4', function(encoder){
            if (encoder === 2){
                selectNext(selected);
            }

            let dimensions = selected.ivory.dimensions;
            let mode = selected.ivory.dimensions.mode[0];

            if(mode === "padding"){
                if(encoder === 1){
                    dimensions[mode].left += 4;
                    selected.style.paddingLeft = dimensions[mode].left + 'px';
                } else if(encoder === 0){
                    dimensions[mode].left -= 4;
                    selected.style.paddingLeft = dimensions[mode].left + 'px';
                }
            } else if(mode === "border"){
                if(encoder === 1){
                    dimensions[mode].left += 4;
                    selected.style.borderLeft = dimensions[mode].left + 'px';
                } else if(encoder === 0){
                    dimensions[mode].left -= 4;
                    selected.style.borderLeft = dimensions[mode].left + 'px';
                }
            } else if(mode === "margin"){
                if(encoder === 1){
                    dimensions[mode].left += 4;
                    selected.style.marginLeft = dimensions[mode].left + 'px';
                } else if(encoder === 0){
                    dimensions[mode].left -= 4;
                    selected.style.marginLeft = dimensions[mode].left + 'px';
                }
            }
        }),
        e5: socket.on('e5', function(encoder){
            
        })
    }
}

function attachController(element){
    if (element.ivory){
        console.log('ivory already attached')
        return false
    } else {
        console.log('ivory attached')
        element.ivory = new Controller();
    }
}

function selectNext(){
    console.log('selecting next')
    var next = selected.nextElementSibling;
    if(next && next.tagName !== 'NOSCRIPT' && !next.ivory){
        selected.classList.toggle("selected");
        selected = eleselectedment.nextElementSibling;
        selected.classList.toggle("selected");
        attachController(selected);
    } else if(next && next.tagName !== 'SCRIPT') {
        selected.classList.toggle("selected");
        selected = selected.nextElementSibling;
        selected.classList.toggle("selected");
    } else {
        console.log('End of document reached.');
    }
}

function selectPrev(){
    console.log('selecting previous')
    var previous = selected.previousElementSibling;

    if(previous && previous.tagName !== 'SCRIPT'){
        selected.classList.toggle("selected");
        selected = selected.previousElementSibling;
        selected.classList.toggle("selected");
    } else {
        console.log('Beginning of document reached.')
    }
}

function selectChild(){
    var child = selected.children;

    if(child.length > 0){
        selected.classList.toggle('selected');
        selected = child[0];
        selected.classList.toggle('selected');
    } else {
        console.log('No child elements found.')
    }
}

function selectParent(){
    var parent = selected.parentElement;

    if(parent && parent.tagName !== 'HTML'){
        selected.classList.toggle('selected');
        selected = parent;
        selected.classList.toggle('selected');
    } else {
        console.log('No parent element found.')
    }
}

function addElement(){
    var newElement = document.createElement('div');
    attachController(newElement);
    selected.insertAdjacentElement('afterend', newElement);
    selected.classList.toggle('selected');
    selected = newElement;
    selected.classList.toggle('selected');
}

function initialize(){
    getWindowWidth();
    window.addEventListener("resize", getWindowWidth);

    var start = document.firstElementChild.lastElementChild;
    var newElement = document.createElement('div');

    newElement.classList.toggle('selected');
    start.append(newElement);

    attachController(newElement);

    return newElement;
}

function removeElement(){
    console.log('removing element from DOM.')
    if (selected.tagName === 'BODY' && selected.tagName === 'HTML'){
        console.log('Cannot remove body or html tag.');
    }
    else if(selected){
        selected.remove()
        selected = start;
        selected.classList.toggle('selected');
    } else {
        console.log('There is no element to remove.')
    }
}

function updateColor(){
    if(selected.ivory){
        selected.ivory.colorText
    }
}

function changeMode(){
    var first = selected.ivory.dimensions.mode.shift();
    selected.ivory.dimensions.mode.push(first);
    console.log(`Current Mode : ${selected.ivory.dimensions.mode[0]}`);
}

function leftRotate(arr){
    if(arr.length > 0){
        var firstItem = arr.shift()
        arr.push(firstItem);
        return arr
    } else {
        throw new Error('Array is empty.')
    }
}

function rightRotate(arr){
    if(arr.length > 0){
        var lastItem = arr.pop()
        arr.unshift(lastItem);
        return arr
    } else {
        throw new Error('Array is empty.')
    }
}

function getWindowWidth(){
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;
    var deviceWidth;

        if(w < 576){
            deviceWidth = 'col-'
        } else if( w <= 767 ){
            deviceWidth = 'col-sm-'
        } else if( w <= 991 ){
            deviceWidth = 'col-md-'
        } else if( w <= 1199 ){
            deviceWidth = 'col-lg-'
        } else if( w >= 1200 ){
            deviceWidth = 'col-xl-'
        }

    return document.deviceWidth = deviceWidth
}

function gridDefine(deviceWidth, gridWidth, target){
    console.log(deviceWidth + gridWidth)
    console.log(gridWidth)
    const colRegex = {
        xs: /col-[0-9]{1,2}/,
        sm: /col-sm-[0-9]{1,2}/,
        md: /col-md-[0-9]{1,2}/,
        lg: /col-lg-[0-9]{1,2}/,
        xl: /col-xl-[0-9]{1,2}/
    }

    console.log(target.className);


    switch(deviceWidth){
        case 'col-':
            if(target.className.search(colRegex.xs) === -1){
                console.log('toggling element')
                target.classList.toggle(deviceWidth + gridWidth)
            } else if( target.className.search(colRegex.xs) >= 0){
                console.log('other condition');
                target.className = target.className.replace(colRegex.xs, deviceWidth + gridWidth)
            }
            break;
        case 'col-sm-':
            if(target.className.search(colRegex.sm) === -1){
                console.log('toggling element')
                target.classList.toggle(deviceWidth + gridWidth)
            } else if( target.className.search(colRegex.sm) >= 0){
                console.log('other condition');
                target.className = target.className.replace(colRegex.sm, deviceWidth + gridWidth)
            }
            break;
        case 'col-md-':
            if(target.className.search(colRegex.md) === -1){
                console.log('toggling element')
                target.classList.toggle(deviceWidth + gridWidth)
            } else if( target.className.search(colRegex.md) >= 0){
                console.log('other condition');
                target.className = target.className.replace(colRegex.md, deviceWidth + gridWidth)
            }
            break;
        case 'col-lg-':
            if(target.className.search(colRegex.lg) === -1){
                console.log('toggling element')
                target.classList.toggle(deviceWidth + gridWidth)
            } else if( target.className.search(colRegex.lg) >= 0){
                console.log('other condition');
                target.className = target.className.replace(colRegex.lg, deviceWidth + gridWidth)
            }
            break;
        case 'col-xl-':
            if(target.className.search(colRegex.xl) === -1){
                console.log('toggling element')
                target.classList.toggle(deviceWidth + gridWidth)
            } else if( target.className.search(colRegex.xl) >= 0){
                console.log('other condition');
                target.className = target.className.replace(colRegex.xl, deviceWidth + gridWidth)
            }
            break;
    }
}