const randomColor = () => {

    const colorArray = [
        '#1976D2',
        '#E91E63',
        '#00C853',
        '#F4511E',
        '#AA00FF',
        '#FFD600',
        '#4CAF50',
        '#ff1744',
        '#2979FF',
        '#7ED321',
        '#00a4e4',
        '#009688',
        '#FF6C31',
        '#7C4DFF',
        '#FBC02D',
        '#E91E63',
        '#0087be',
        '#dc3d84',
        '#FF6F00'
    ];
return colorArray[Math.floor(Math.random(2)*colorArray.length)]
};

export default randomColor;