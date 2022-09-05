import Images from "../../public/images/index"

export default function  getRandomColor(id) {
    if (id === 0){ return '#38b66a'}
    if (id === 1){ return '#3e75b4'}
    if (id === 2){ return '#a13dbe'}
    // if (id === 3){ return '#d94c4c'}
    return "#a6a6a6"
}

export function getIconInfo(title){
    switch (title) {
        case 1:
            return {image: Images.icons.salad, color: "#2eea10", title: 'Салати'}
        case 2:
            return {image: Images.icons.soup, color: "#f77005", title: 'Супи'}
        case 3:
            return {image: Images.icons.appetiser, color: "#FEBD54", title: 'Предястия'}
        case 4:
            return {image: Images.icons.sauce, color: "#810408", title: 'Сосове'}
        case 5:
            return {image: Images.icons.meat, color: "#ee7276", title: 'Месо'}
        case 6:
            return {image: Images.icons.noMeat, color: "#1ba502", title: 'Без Месо'}
        case 7:
            return {image: Images.icons.dough, color: "#a87556", title: 'Тестени'}
        case 8:
            return {image: Images.icons.dessert, color: "#df010f", title: 'Десерти'}
        case 9:
            return {image: Images.icons.fish, color: "#014ea8", title: 'Риба'}
        case 10:
            return {image: Images.icons.drinks, color: "#B419C4", title: 'Напитки'}
        case 11:
            return {image: Images.icons.winter, color: "#CCCCCC", title: 'Зимнина'}
        case 12:
            return {image: Images.icons.baby, color: "#24CEDD", title: 'Бебешки'}
        case 13:
            return {image: Images.icons.others, color: "#45D007", title: 'Други'}
    }
}
