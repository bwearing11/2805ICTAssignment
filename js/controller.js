let x = 3;
        changeScreen(x);
    function changeScreen(x){
        switch(x){
        case 1:
            //screen 1 (start up page)
            //loadScript("js/settings.js");
            break;
        case 2: 
            //screen 2 (top score page)
            //loadScript("js/settings.js");
            break;
        case 3:
            //screen 3 (configure page)
            loadScript("js/settings.js");
            break;
        case 4: 
            //screen 4 (game page)
            break;
        }
    }

        function loadScript(src){
            var el = document.createElement("script")
            el.src = src;
            document.body.appendChild(el)
        }