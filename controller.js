let screenNum = 1;

changeScreen(screenNum);
    function changeScreen(screenNum){
        switch(screenNum){
        case 1:
            //screen 1 (start up page)
            loadScript("js/startup.js");
            break;
        case 2: 
            //screen 2 (top score page)
            //loadScript("js/highScore.js");
            break;
        case 3:
            //screen 3 (configure page)
            loadScript("js/settings.js");
            break;
        case 4: 
            //screen 4 (game page)
            loadScript("js/tetris.js");
            break;
        }
    }

        function loadScript(src){
            var el = document.createElement("script")
            el.src = src;
            document.body.appendChild(el)
        }