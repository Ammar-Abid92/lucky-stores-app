export const PHONE_REGEX =
    /^03[0-4][0-9]{8}$/;



export const categories = [
    {
        id: 1,
        name: 'Pizza',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 2,
        name: 'Burger',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 3,
        name: 'Italian',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 4,
        name: 'Chinese',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 5,
        name: 'Noodles',
        image: require('../assets/images/pizzaIcon.png'),
    },
    {
        id: 6,
        name: 'Sweets',
        image: require('../assets/images/pizzaIcon.png'),
    },

]


export const featured = {
    id: 1,
    title: 'Hot and Spicy',
    description: 'soft and tender fried chicken',
    restaurants: [
        {
            id: 1,
            name: 'Papa Johns',
            image: require('../assets/images/pizza.png'),
            description: 'Hot and spicy pizzas',
            lng: -85.5324269,
            lat: 38.2145602,
            address: '434 second street',
            stars: 4,
            reviews: '4.4k',
            category: 'Fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 2,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 3,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
            ]

        },
        {
            id: 2,
            name: 'Papa Johns',
            image: require('../assets/images/pizza.png'),
            description: 'Hot and spicy pizzas',
            lng: -85.5324269,
            lat: 38.2145602,
            address: '434 second street',
            stars: 4,
            reviews: '4.4k',
            category: 'Fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 2,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 3,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
            ]

        },
        {
            id: 3,
            name: 'Papa Johns',
            image: require('../assets/images/pizza.png'),
            description: 'Hot and spicy pizzas',
            lng: -85.5324269,
            lat: 38.2145602,
            address: '434 second street',
            stars: 4,
            reviews: '4.4k',
            category: 'Fast Food',
            dishes: [
                {
                    id: 1,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 2,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 3,
                    name: 'pizza',
                    description: 'cheezy garlic pizza',
                    price: 10,
                    image: require('../assets/images/pizzaDish.png')
                },
            ]

        }
    ]
}

export const formatNum = (number) =>
    Number(number)
        .toFixed(2)
        .replace(/[.,]00$/, "")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");


export const formatAMPM = (date) => {
    const GMT = 0; 
    let hours = date.getHours() + GMT;
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour ‘0’ should be ‘12’
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
};

export const formatCreationDate = (date) => {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const dateFilter = ["Yesterday", "Today"];
    let current_date = new Date(date * 1000);
    const dateString = `${current_date.getDate()} ${monthNames[current_date.getMonth()]
        } ${current_date.getFullYear()}, ${formatAMPM(current_date)}`;
    return dateString;
};

export const themeStyleSheet = {
    red: '#e51a32', //delete
    extraLightGray: '#f5f5f7', //seperator
    lightGray: '#cecece', //disabled input fields, fields line
    mediumGray: '#565656', //date,time,information
    darkGray: '#414143', //back btn,titles,customer name
    brightGreen: '#4ac600', //checkmark,accept,advance
    brightOrange: '#f96a32', //udhaar
    mainColor: '#3b0c36', //top bar, icons, input field labels, menu
    white: '#fff',
    whiteShade: '#f5f5f7',
    bluishwhite: '#f8fcff',
    skyBlue: '#27aae1', //notification,link
    mustardYellow: '#f2bc1d', // notification
    screenBg: '#f8f8f8',

    //Udhaar
    // statusbarColor: "#552484",
    // statusbarColor: '#00a9dd',

    playTutorialIconColor: '#a1008a',
    fontColor: '#414143',
    statusbarColor: '#0b195e',
    whitecolor: '#fff',
    // orangeColor: "#ff6b01",
    giveudhaarbtncolor: '#f96a32',
    orangeColor: '#4ac600',
    giveudhaarBtn: '#ffbb28',
    acceptpaymentBtn: '#8ec63f',
    balanceBoxBg: '#f5f5f7',
    balanceBoxInnerText: '#e31b35',
    notesBorderColor: '#e7e7e9',
    tickmarkbg: '#d6df22',
    udhaarscreenheaderIcon: '#fe6a00',
    acceptpaymentscreenheaderIcon: '#8ec63f',
    udhaarborderBottom: '#f8f8f8',
    calenderIconColor: '#bdbdbd',
    calenderDateColor: '#58585a',
    totalColor: '#d3d3d5',
    heartColor: '#ef4136',
    // oscarLogoIconColor: "#510146",#3b0c36
    oscarLogoIconColor: '#3b0c36',

    loginTextColor: '#b6c563',
    //disableColor: "#d6cfd7",
    disableColor: '#ddd',
    disableColor2: '#969393',
    containerColor: '#fafbfb',
    iconandtextnewclr: '#404042',
    serachinputplaceholder: '#5a5a5d',
    searchbBoxbordercolornew: '#e3e3e5',
    customerListingName: '#3f3f41',
    customerListingNumbernew: '#565656',
    listingUdhaarText: '#e61a33',
    searchContMain: '#f5f5f6',
    searchTextColor: '#717072',
    searchTextColorupdate: '#cecece',
    iconLightColor: '#d1d3d4',
    SearchBoxDarkColor: '#8880b2',
    lightPurpleColor: '#615b81',
    productListBgColor: '#F1F2F2',
    productIntialColor: '#958CDC',
    productNameColor: '#58595B',
    productDetailTextColor: '#A7A9AC',
    productChargeBtn: '#D7DF23',
    addCutomerColor: '#00AEEF',
    paymentButton: '#EFEFEF',
    paymentButtonDisable: '#fbfbfb',
    udhaarButton: '#e55c00',
    paymentButtonIcon: '#300F38',
    segmentBgColor: '#E6E7E8',
    switchDeactivatebg: '#BCBEC0',
    switchActivatebg: '#8DC63F',
    progressbarColor: '#a67be5',
    discountBtnBg: '#5D5D5D',
    addBtnBg: '#958CDC',
    voidBtnBg: '#FF9900',
    dltBtnBg: '#ED1C24',
    orderStatusText: '#FBB040',
    // headerbgColor: "#662d94",
    // headerbgColor: '#00aeef',
    headerbgColor: '#070d59',
    qtyBorderColor: '#f0f1f5',
    removeBtBg: '#ea4335',
    cashButtonBg: '#21a52a',
    disableBtn: '#f4f4f4',
    calculatorBorder: '#f0f1f1',
    disableColornew: '#dedede',
    greenColor: '#39b54a',
    udharAmunt: '#ff714a',
    customerPhoneNumber: '#575757',
    tableHeaderbg: '#fcfcfc',
    udhartableCell: '#f96a32',
    splashScreenBg: '#d14ffb',
    newBgColor: '#f2f3f3',
    payNowButton: '#27aae1',
    gradientColorTop: '#3d0137',
    gradientColorBottom: '#9e0088',
    greenColor: '#50b54f',
    redColor: '#e61b31',
    lightGrayColor: '#f0f0f0',
    darkGrayColor: '#414143',
    //Theme Color
    borderLightColor: 'rgba(0,0,0,0.1)',
    // Header Styling
    headerHeight: 65,
    headerSingleColor: '#a180e2',
};