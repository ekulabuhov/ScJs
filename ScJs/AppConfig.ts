require.config({
    baseUrl: "Scripts",
    paths: {
        easel: 'thirdparty/easeljs-0.7.1.combined',
        preload: 'thirdparty/preloadjs-0.4.1.min',
        tween: 'thirdparty/tweenjs-0.5.1.min'
    }
}); 

require(["Main"]);