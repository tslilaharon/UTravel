import {
    StyleSheet
} from 'react-native';
import {
    colors
} from './colors';

export const general = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    NotFoundBox: {
        margin: 50,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.secondary
    },
    boxLoading: {
        marginVertical: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: colors.secondary
    },
    starBox: {
        marginTop: 5,
        marginHorizontal: '37%',
        height: 15,
        width: '25%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        color: colors.star
    },
    starll: {
        marginVertical: 15,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 15,
        color: colors.primary,
        fontSize: 18
    },
    ViewMore: {
        color: colors.primary,
        fontSize: 16,
        padding: 20,
        textAlign: 'center',
    },
    nofound: {
        height: 100,
        width: 300,
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: '12%',
        marginVertical: 20,
    },
    content: {
        color: colors.dark,
        fontSize: 19,
    }
});
export const basic = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.white
    },
    box: {
        padding: 20,
        paddingVertical: 14,
        position: 'relative',
    },
    btnMain: {
        borderRadius: 15,
        alignContent: 'center',
        backgroundColor: colors.primary,
        marginVertical: 10,
        marginHorizontal: 60,
        padding: 10
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 20
    },
});
export const form = StyleSheet.create({
    field: {
        padding: 20,
        paddingVertical: 14,
        position: 'relative',
    },
    heading: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    label: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 18
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        color: colors.primary,
        paddingVertical: 1,
        letterSpacing: 1,
        fontSize: 12
    },
    eye: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        fontSize: 25,
        color: colors.secondary,
        padding: 20,
        paddingRight: 25
    },
    boxLinks: {
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: colors.primary,
        fontSize: 16,
    },
    btnLink: {
        backgroundColor: colors.white,
        padding: 5
    },
    btnBold: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 18
    },
    btnBusiness: {
        alignContent: 'center',
        marginVertical: 0,
    },
    btnCenter: {
        textAlign: 'center'
    },
    terms: {
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 16,
        padding: 5
    },
});
export const welcome = StyleSheet.create({
    logoContainer: {
        marginTop: 60,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    title: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    text: {
        paddingVertical: 10,
        color: colors.primary,
        lineHeight: 25,
        textAlign: 'center',
        fontSize: 16,
    }
});
export const profile = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    userInfoSection: {
        flexDirection: 'row'
    },
    name: {
        marginTop: 20,
        paddingVertical: 5,
        fontSize: 24,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    iconMenu: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    textMenu: {
        color: colors.dark,
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
export const home = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    DarkOver: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: '100%',
        backgroundColor: colors.black,
        opacity: 0.4,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    searchContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 200,
        margin: 30,
    },
    cityName: {
        fontSize: 55,
        fontWeight: 'bold',
        color: colors.primary,
        textShadowOffset: {
            width: 1,
            height: 2
        },
        textShadowRadius: 15,
        textShadowColor: colors.black,
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.white,
        textShadowOffset: {
            width: 1,
            height: 2
        },
        textShadowRadius: 10,
        textShadowColor: colors.black,
    },
    userText: {
        fontSize: 25,
        color: colors.white,
        textShadowOffset: {
            width: 3,
            height: 2
        },
        textShadowRadius: 6,
        textShadowColor: colors.black,
    },
    btnView: {
        position: 'absolute',
        paddingHorizontal: 30,
        paddingVertical: 8,
        marginLeft: 25,
        marginTop: 430,
        backgroundColor: colors.primary,
        borderRadius: 15,
    },
    titleText: {
        marginTop: 35,
        color: colors.primary,
        fontSize: 20,
        paddingLeft: 20,

    },
    ViewMore: {
        color: colors.primary,
        fontSize: 16,
        padding: 20,
        textAlign: 'center',
    },

});
export const search = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        margin: 10,
    },
    input: {
        height: 40,
        width: 350,
        marginHorizontal: 10,
        backgroundColor: colors.white,
        opacity: 0.5,
        borderRadius: 15,
        padding: 10,
        paddingRight: 50,
    },
    searchIcon: {
        position: 'absolute',
        right: 20,
        top: 10,
        fontSize: 20,
        color: colors.dimGray
    },
    result: {
        width: 350,
        borderRadius: 15,
        maxHeight: 130,
        backgroundColor: colors.white,
        opacity: 0.5,
        marginTop: 10,
        left: 10
    },
    resultItem: {
        marginHorizontal: 30,
        marginVertical:15,
        color: colors.primary,
        fontSize: 18
    }

});
export const popularcitys = StyleSheet.create({
    imgBox: {
        height: 150,
        width: 300,
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    absBox: {
        position: 'absolute',
    },
    imgStyle: {
        height: 150,
        width: 300,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    BoxOverlay: {
        backgroundColor: colors.black,
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.3,
        borderRadius: 10,
    },
    boxText: {
        color: colors.white,
        fontSize: 21,
    },
});
export const popularattractions = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBox: {
        height: 150,
        width: 150,
        padding: 5,
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    absBox: {
        position: 'absolute',
    },
    imgStyle: {
        height: 150,
        width: 150,
        borderRadius: 10,
    },
    BoxOverlay: {
        backgroundColor: colors.black,
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.3,
        borderRadius: 10,
    },
    boxTitle: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    boxText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 15,
    },
});
export const bestsellers = StyleSheet.create({
    imgBox: {
        height: 160,
        width: '90%',
        backgroundColor: colors.white,
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 10,
        elevation: 10,
        borderColor: colors.light,
        borderWidth: 0.2,
    },
    absBox: {
        position: 'absolute',
    },
    imgStyle: {
        marginTop: 15,
        marginLeft: 10,
        height: 130,
        width: 100,
        borderRadius: 10,
    },
    boxTitle: {
        marginTop: 15,
        color: colors.primary,
        fontSize: 20,
        textAlign: 'center',
    },
    boxLocation: {
        color: colors.dark,
        fontSize: 15,
        textAlign: 'center',
    },
});
export const headercity = StyleSheet.create({
    box: {
        position: 'absolute',
        left: 10,
        color: colors.primary,
        bottom: 20,
    },
    title: {
        color: colors.white,
        fontSize: 40,
        fontWeight: 'bold',
        textShadowOffset: {
            width: 1,
            height: 2
        },
        textShadowRadius: 15,
        textShadowColor: colors.black,
    },
    country: {
        color: colors.white,
        fontSize: 15,
        marginVertical: 5,
        textShadowOffset: {
            width: 1,
            height: 1
        },
        textShadowRadius: 10,
        textShadowColor: colors.black,
    },
});
export const cityinfo = StyleSheet.create({
    box: {
        height: 320,
        width: '90%',
        backgroundColor: colors.white,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        marginVertical: 30,
        borderRadius: 10,
        elevation: 10,
        borderColor: colors.light,
        borderWidth: 0.2,
    },
    title: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 22,
        paddingTop: 20,
        paddingLeft: 20,
    },
    description: {
        color: colors.dark,
        fontSize: 18,
        padding: 15,
    },
    detailsBox: {
        padding: 10,
    },
    details: {
        color: colors.primary,
        fontSize: 18,
        padding: 5,
    },
});
export const attractionbox = StyleSheet.create({
    imgBox: {
        height: 160,
        width: '90%',
        backgroundColor: colors.white,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 10,
        borderColor: colors.light,
        borderWidth: 0.2,
    },
    absBox: {
        position: 'absolute',
    },
    imgStyle: {
        marginTop: 15,
        marginLeft: 10,
        height: 130,
        width: 100,
        borderRadius: 10,
    },
    boxTitle: {
        marginTop: 20,
        marginLeft: 120,
        color: colors.primary,
        fontSize: 20,
    },
    boxLocation: {
        color: colors.primary,
        fontSize: 15,
        textAlign: 'center',
    },
    hoursBox: {
        marginTop: 25,
        marginHorizontal: 120,
        height: 15,
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hoursText: {
        backgroundColor: colors.white,
        color: colors.primary,
        fontSize: 13,
        fontWeight: 'bold',
        margin: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 15,
        paddingVertical: 3,
        paddingHorizontal: 15,
    },
    price: {
        color: colors.primary,
        fontSize: 20,
        textAlign: 'right',
        marginTop: 10,
        marginVertical: 30,
        marginHorizontal: 20
    },
});
export const review = StyleSheet.create({
    imgBox: {
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 15,
        padding: 12,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    abs: {
        position: 'absolute',
    },
    imgStyle: {
        borderRadius: 10,
        margin: 15,
        height: 80,
        width: 70,
    },
    ratingBox: {
        left: '30%',
        marginTop: 5,
        marginHorizontal: 10,
    },
    title: {
        color: colors.primary,
        fontSize: 17,
        left: '10%',
        marginHorizontal: 60,
        fontWeight: 'bold'
    },
    location: {
        color: colors.secondary,
        fontSize: 14,
        marginHorizontal: 50,
        left: '13%'
    },
});
export const openinghours = StyleSheet.create({
    box: {
        backgroundColor: colors.white,
    },
    title: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 10,
    },
    hoursBox: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    hourText: {
        backgroundColor: colors.primary,
        color: colors.white,
        fontSize: 15,
        margin: 5,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
});
export const quantity = StyleSheet.create({
    container: {
    },
    box: {
        height: 35,
        width: 100,
        backgroundColor: colors.lightgray,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityBtn: {
        height: 25,
        width: 25,
        backgroundColor: colors.white,
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export const attraction = StyleSheet.create({
    box: {
        backgroundColor: colors.white,
        marginHorizontal: 20,
        marginTop: 20,
    },
    title: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 10
    },
    Stock: {
        color: colors.dark,
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 40
    },
    price: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 28,
        margin: 5
    },
    description: {
        color: colors.primary,
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    StockBox: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ratingBox: {
        height: 100,
        width: 300,
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: '12%',
        marginVertical: 20,
        paddingHorizontal: '20%'
    },
    ratingTitle: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 35,
    },

});
export const contactus = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    messsageBox: {
        height: 500,
        width: '80%',
        backgroundColor: colors.white,
        padding: 20,
        marginHorizontal: 40,
        marginTop: 30,
        marginBottom: 50,
        borderRadius: 10,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor: colors.light,
        borderWidth: 0.2,
    },
    socialBox: {
        height: 50,
        width: '70%',
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: '15%',
        borderRadius: 10,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor: colors.light,
        borderWidth: 0.2,
        justifyContent: 'center',
    },
    socialIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '10%',
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.primary,
        fontSize: 16,
    },
    titleDetails: {
        color: colors.primary,
        paddingHorizontal: 60,
        fontSize: 20,
        fontWeight: 'bold',
    },
    details: {
        paddingHorizontal: 20,
        color: colors.black,
        fontSize: 15,
    },
    field: {
        padding: 20,
        paddingVertical: 14,
        position: 'relative',
    },
    heading: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center'
    },
    line: {
        borderColor: colors.primary,
        borderWidth: 2,
        width: 2,
    },
    label: {
        margin: 5,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 18
    },
    input: {
        height: 150,
        borderWidth: 1.8,
        borderColor: colors.primary,
        color: colors.primary,
        paddingVertical: 1,
        fontSize: 15
    },
});
export const cart = StyleSheet.create({
    AttDetails: {
        paddingHorizontal: 10,
        flex: 1,
    },
    image: {
        width: 120,
        height: 30,
    },
    AttBox: {
        padding: 15,
        backgroundColor: colors.white,
        marginVertical: 15,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
    },
    boxDetails: {
        flexDirection: 'row',
    },
    iconInfo: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    AttName: {
        color: colors.dimGray,
        fontSize: 18,
        fontWeight: 'bold',
    },
    AttLoc: {
        color: colors.dimGray,
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
    },
    viewIcon: {
        height: 1,
        backgroundColor: colors.lightgray,
        width: '100%',
        marginVertical: 10,
    },
    AttPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imgBox: {
        height: 120,
        width: '90%',
        backgroundColor: colors.white,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor: colors.light,
        borderWidth: 0.2,
        paddingHorizontal: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    abs: {
        position: 'absolute',
    },
    imgStyle: {
        marginLeft: 10,
        height: 90,
        width: 90,
        borderRadius: 10,
    },
    title: {
        color: colors.primary,
        fontSize: 20,
    },
    location: {
        color: colors.dark,
        fontSize: 15,
    },
    box: {
        marginHorizontal: 60,
    },
    qtyBox: {
        marginTop: 15,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        color: colors.primary,
        fontSize: 20,
        textAlign: 'right',
        marginTop: 5,
        marginHorizontal: 20
    },
});
export const card = StyleSheet.create({
    bgcard: {
        height: 230,
        width: '100%',
        marginVertical: 5,
        borderRadius: 15,
        overflow: 'hidden'
    },
    iconcard: {
        position: 'absolute',
        top: 20,
        right: 40,
        width: 60,
        height: 45,
    },
    Viewcard: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 10,
        paddingHorizontal: 50
    },
    textCard: {
        color: colors.white,
        fontSize: 18,
        textShadowOffset: {
            width: 1,
            height: 1
        },
        textShadowRadius: 10,
        textShadowColor: colors.black,
    },
    labelCard: {
        color: colors.white,
        fontSize: 20,
        textShadowOffset: {
            width: 1,
            height: 1
        },
        textShadowRadius: 10,
        textShadowColor: colors.black,
    },
    text: {
        width: 120,
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        width: 120,
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 18,
    },
});
export const listattractions = StyleSheet.create({
    textPrice: {
        paddingHorizontal: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    text: {
        width: 120,
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        width: 120,
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 18,
    },
});
export const businessprofile = StyleSheet.create({
    dataBox: {
        height: 150,
        width: '95%',
        backgroundColor: colors.white,
        padding: 20,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 10,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor: colors.light,
        borderWidth: 0.2,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dataTitle: {
        color: colors.primary,
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textNum: {
        color: colors.primary,
        fontSize: 28,
        fontWeight: 'bold',
    },
    details: {
        color: colors.dark,
        fontSize: 15,
    },
    textTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 18
    },
    infoBoxWrapper: {
        borderBottomColor: colors.secondary,
        borderBottomWidth: 1,
        borderTopColor: colors.secondary,
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        color: colors.dark,
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center'
    },
    title: {
        color: colors.primary,
        fontSize: 40,
        fontWeight: 'bold',
    },
    country: {
        color: colors.primary,
        marginVertical: 5,
    },
    textView: {
        position: 'absolute',
        left: 20,
        color: colors.primary,
        bottom: 0,
    },
});
export const businessattraction = StyleSheet.create({
    box: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
    },
    desBox: {
        backgroundColor: colors.white,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    title: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 22,
        paddingTop: 20,
        paddingLeft: 20,
    },
    StockBox: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editdelete: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    menu: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    textBold: {
        color: colors.primary,
        marginLeft: 5,
        fontSize: 18,
        lineHeight: 26,
        fontWeight: 'bold'
    },
    menuText: {
        color: colors.black,
        marginLeft: 5,
        fontSize: 17,
        lineHeight: 26,
    },

});
export const addreview = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    Box: {
        height: 420,
        width: '80%',
        backgroundColor: colors.white,
        padding: 10,
        marginHorizontal: 40,
        marginVertical: 40,
        borderRadius: 10,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor: colors.light,
        borderWidth: 0.2,
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxDetails: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: colors.secondary
    },
    detailsRow: {
        flexDirection: 'row',
    },
    titleDetails: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        paddingHorizontal: 5,
        color: colors.primary,
        fontSize: 15,
    },
    field: {
        padding: 20,
        paddingVertical: 14,
        position: 'relative',
    },
    line: {
        borderColor: colors.primary,
        borderWidth: 2,
        width: 2,
    },
    label: {
        margin: 10,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    input: {
        height: 120,
        borderWidth: 1.8,
        borderColor: colors.primary,
        color: colors.primary,
        paddingVertical: 1,
        fontSize: 15,
        textAlignVertical: 'top',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
});
export const settings = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightprimary
    },
    boxView: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 50,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    label: {
        marginVertical: 15,
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    text: {
        marginVertical: 5,
        marginHorizontal: 15,
        color: colors.black,
        fontSize: 15,
        textAlign: 'center'
    },
    iconMenu: {
        borderWidth: 0.7,
        borderColor: colors.primary,
        flexDirection: 'row',
        padding: 15,
        margin: 10,
    },
});
export const allcities = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
    labelBox: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        marginVertical: 15,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    containerBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 180
    },
    imgBox: {
        height: 200,
        width: 170,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    absBox: {
        position: 'absolute',
    },
    imgStyle: {
        height: 200,
        width: 170,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    BoxOverlay: {
        backgroundColor: colors.dark,
        position: 'absolute',
        height: '35%',
        width: '100%',
        opacity: 0.3,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    textBox: {
        alignItems: 'center',
        textAlign: 'center',
        padding: 5
    },
    name: {
        color: colors.white,
        fontSize: 25,
        textShadowOffset: {
            width: 1,
            height: 2
        },
        textShadowRadius: 15,
        textShadowColor: colors.black,
    },
    country: {
        padding: 2,
        color: colors.lightgray,
        fontSize: 12,
        textShadowOffset: {
            width: 1,
            height: 2
        },
        textShadowRadius: 15,
        textShadowColor: colors.black,
    },

});
export const listreview = StyleSheet.create({
    labelBox: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginVertical: 5,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    textlabel: {
        margin: 10,
        color: colors.dark,
        fontSize: 18,
        textAlign: 'center'
    },
    imgBox: {
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 30,
        marginVertical: 10,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    abs: {
        position: 'absolute',
    },
    imgStyle: {
        marginHorizontal: 15,
        height: 65,
        width: 80,
        borderRadius: 10,
    },
    textBox: {
        left: '10%',
        marginHorizontal: 60,
    },
    name: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
    city: {
        color: colors.black,
        fontSize: 17,
    },
    date: {
        color: colors.dark,
        fontSize: 15,
    },
});
export const listorders = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    labelBox: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginVertical: 5,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    textlabel: {
        margin: 10,
        color: colors.dark,
        fontSize: 18,
        textAlign: 'center'
    },
    cardContainer: {
        padding: 20,
        paddingBottom: 0,
    },
    viewIcon: {
        height: 1,
        backgroundColor: colors.lightgray,
        width: '100%',
        marginVertical: 10,
    },
    boxIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconsOrderText: {
        fontSize: 14,
        marginTop: 5,
    },
    iconsOrder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderId: {
        color: colors.dark,
        paddingVertical: 5,
    },
    iconMore: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    iconInfo: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    orderBox: {
        padding: 15,
        backgroundColor: colors.white,
        marginVertical: 15,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
    },
    boxDetails: {
        flexDirection: 'row',
    },
    orderDetails: {
        paddingHorizontal: 10,
        flex: 1,
    },
    userName: {
        color: colors.dimGray,
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderPrice: {
        color: colors.dimGray,
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
    },
    orderInfo: {
        color: colors.dimGray,
        fontSize: 15,
        fontWeight: '500',
        marginTop: 5,
    },
});
export const orders = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    detailView: {
        backgroundColor: colors.white,
        marginVertical: 5,
        padding: 20,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
    },
    detailsBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        alignItems: 'center'
    },
    detailsLebel: {
        fontSize: 20,
        margin: 10,
        color: colors.primary
    },
    PriceRow: {
        marginHorizontal: 30,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    PriceText: {
        fontSize: 20,
        color: colors.black
    },
    textbox: {
        backgroundColor: colors.lightprimary,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelDetails: {
        fontSize: 18,
        color: colors.dimGray
    },
    boxOrder: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textDetails: {
        color: colors.black,
        opacity: 0.6,
        fontSize: 14
    },
    textDet: {
        fontSize: 13,
        color: colors.lightText,
        marginLeft: 10
    },
    textItem: {
        color: colors.lightText,
        paddingHorizontal: 10
    },
    boxPaid: {
        marginVertical: 10,
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        width: 150,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
    },
    viewInfo: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        shadowRadius: 4,
    },
    boxordPaid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    boxIcon: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconsOrderText: {
        fontSize: 14,
        marginTop: 5,
    },
    iconsOrder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBox: {
        marginVertical: 10,
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: 'center',
        padding: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    abs: {
        position: 'absolute',
    },
    imgStyle: {
        marginHorizontal: 15,
        height: 80,
        width: 60,
        borderRadius: 10,
    },
    textBox: {
        left: '5%',
        marginHorizontal: 60,
    },
    viewIcon: {
        height: 1,
        backgroundColor: colors.lightText,
        width: '100%',
        marginVertical: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteOrderIcon: {
        alignSelf: 'flex-end',
        fontSize: 25,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 300,
        height: 300,
        backgroundColor: 'red',
        marginBottom: 30,
    },
    text: {
        fontSize: 30,
    },
});
export const payment = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: '100%',
        padding: 20
    },
    label: {
        marginVertical: 15,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    boxordPaid: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ViewSelectes: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        margin: 15,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 20,
    },
    icon: {
        width: 60,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.lightprimary
    },
    text: {
        flex: 1,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    pickerMonth: {
        width: 90,
        top: 32,
        right: 10,
        color: colors.primary
    },
    pickerYear: {
        width: 90,
        top: 32,
        right: 40,
        color: colors.primary,
    },
    expiryDateLabel: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        left: 35,
        top: 15
    }

});
export const carttotal = StyleSheet.create({
    totalBox: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 35,
        color: colors.primary,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    total: {
        backgroundColor: colors.lightprimary,
        width: '90%',
        paddingHorizontal: 15,
        paddingTop: 20,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    amountView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginVertical: 5,
    },

});