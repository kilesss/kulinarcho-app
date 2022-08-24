
export default function language(key){
    const words = {
        details:'Go to details',
        enter: 'Вход',
        facebook: 'Facebook',
        name:'Име',
        email:'Имейл',
        confirmPassword: 'Потвърди парола',
        password:'Парола',
        or:'или',
        signup:'Регистрация',
        waitConfirmEmail: 'Моля потвърдете регистрацията си в изпратения ви емайл!',
        youHaveAccount: 'Вече имаш акаунт?',
        cameIn: 'Влез',
        forgottenPassword: 'Забравена парола',
        backTo: 'Върни се на',
        send: 'Изпрати',
        add: "Добави",
        shoppingLists: "Списъци за пазар",
        addProduct: "Добави продукт",
        amount: "Количество",
        price: "Цена",
        cancel: "Отмени",
        buyProduct: "Купи Продукт",
        newShoppingList: "Нов списък за пазар",
        editShoppingList: "Промени името на списъка",
        change: "Промени"

    }
    return words[key];
}