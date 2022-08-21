export default function validationRules() {
    return {
        'email': {
            'valid': "Емайла не е валиден.",
            'required': "Емайла е задължителен"
        },
        'password': {
            "required": "Паролата е задължителна",
            "min": "Паролата трябва да е поне 6 симвила"
        }
    }
}