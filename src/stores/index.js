import { defineStore } from 'pinia';
import {computed, onMounted, ref, watch} from 'vue';

const STORAGE_KEY = 'formData';
const USERS_STORAGE_KEY = 'usersData';

class FormStorage {
    static getDefaultConfig() {
        return {
            name: '',
            birthday: '',
            phone: '',
            email: ''
        };
    }

    static save(userConfig) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userConfig));
    }

    static load() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : this.getDefaultConfig();
    }

    static saveUsers(users) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    static loadUsers() {
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        return storedUsers ? JSON.parse(storedUsers) : [];
    }

    static saveForm(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
    static deleteForm() {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export const useFormStore = defineStore('form', () => {
    const formConfig = ref(FormStorage.load());
    const usersConfig = ref(FormStorage.loadUsers());
    const isLoading = ref(false);

    const formErrors = ref({
        name: [],
        birthday: [],
        phone: [],
        email: []
    });

    const formTouched = ref({
        name: false,
        birthday: false,
        phone: false,
        email: false
    });

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        const phoneWithoutSymbols = phone.replace(/[^\d+]/g, '');
        return /^\+7\d{10}$/.test(phoneWithoutSymbols);
    };

    const validateBirthday = (birthday) => {
        return /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(birthday);
    };

    const clearErrors = () => {
        formErrors.value.name = [];
        formErrors.value.birthday = [];
        formErrors.value.phone = [];
        formErrors.value.email = [];
    }

    const clearTouched = () => {
        formTouched.value.name = false;
        formTouched.value.birthday = false;
        formTouched.value.phone = false;
        formTouched.value.email = false;
    }

    const validateForm = () => {
        let isValid = true;

        clearErrors()

        if (formConfig.value.name.trim().length === 0) {
            formErrors.value.name.push('Это поле обязательно');
            isValid = false;
        }

        if (formConfig.value.birthday.trim().length === 0) {
            formErrors.value.birthday.push('Это поле обязательно');
            isValid = false;
        } else if (!validateBirthday(formConfig.value.birthday)) {
            formErrors.value.birthday.push('Неверный формат даты (ДД.MM.ГГГГ)');
            isValid = false;
        }

        if (!validatePhone(formConfig.value.phone)) {
            formErrors.value.phone.push('Некорректный номер телефона');
            isValid = false;
        }

        if (!validateEmail(formConfig.value.email)) {
            formErrors.value.email.push('Некорректный email');
            isValid = false;
        }

        return isValid;
    };

    onMounted(() => {
        validateForm();
    });

    const isFormValid = computed(() => {
        return validateForm()
    })

    const submitForm = async () => {
        if (!isFormValid.value) {
            alert('Форма содержит ошибки!');
            return;
        }

        isLoading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        isLoading.value = false;

        usersConfig.value.push({ ...formConfig.value });
        FormStorage.saveUsers(usersConfig.value);

        alert('Данные успешно сохранены!');
        clearErrors()
        clearTouched()
        FormStorage.deleteForm()
        formConfig.value = FormStorage.getDefaultConfig();
    };

    watch(formConfig.value, (newValue) => {
        if (newValue) {
            FormStorage.saveForm(newValue);
            validateForm();
        }
    }, { deep: true });

    return {
        formConfig,
        usersConfig,
        isLoading,
        formErrors,
        isFormValid,
        formTouched,
        submitForm,
    };
});
