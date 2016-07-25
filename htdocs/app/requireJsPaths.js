if (window.require !== undefined) {
    require.config({
        baseUrl: '/app',

        paths: {
            'domReady': '/components/domReady/domReady',
            'text': '/components/text/text'
        }
    });
}
