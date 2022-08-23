export default function validationRules() {
    return {
        'email': {
            'valid': "Емайла не е валиден.",
            'required': "Емайла е задължителен"
        },
        'name': {
            'required': "Името е задължителено"
        },
        'password': {
            "required": "Паролата е задължителна",
            "min": "Паролата трябва да е поне 6 симвила",
            "same": "Паролите са различни"
        }
    }
}