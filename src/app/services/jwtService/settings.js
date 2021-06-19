const settings =  {
    layout: {
        style: 'layout1',
        config: {
            scroll: 'content',
            navbar: {
                display: true,
                folded: true,
                position: 'left'
            },
            toolbar: {
                display: true,
                style: 'fixed',
                position: 'below'
            },
            footer: {
                display: true,
                style: 'fixed',
                position: 'below'
            },
            mode: 'fullwidth'
        }
    },
    customScrollbars: true,
    theme: {
        main: 'defaultDark',
        navbar: 'defaultDark',
        toolbar: 'defaultDark',
        footer: 'defaultDark'
    }
};

export default settings;