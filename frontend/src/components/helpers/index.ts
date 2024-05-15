export const statesOfAustralia = [
    { code: 'ACT', label: 'Australian Capital Territory' },
    { code: 'NSW', label: 'New South Wales' },
    { code: 'NT', label: 'Northern Territory' },
    { code: 'QLD', label: 'Queensland' },
    { code: 'SA', label: 'South Australia' },
    { code: 'TAS', label: 'Tasmania' },
    { code: 'VIC', label: 'Victoria' },
    { code: 'WA', label: 'Western Australia' },
];

export const IsEmpty = (target: HTMLInputElement | HTMLSelectElement) => {
    const isValid = target.value.length > 1;
    if (!isValid) {
        target.style.borderColor = 'red';
    } else {
        target.style.borderColor = '';
    }
}

export const limitInputLength = (input: HTMLInputElement | HTMLSelectElement, maxLength: number) => {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }

};