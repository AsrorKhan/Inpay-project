export const changeFormatPhoneNumber = (props = '000 00 000 00 00') => {
    if (props.length > 0) {
        const regex = /\s/g;
        const formattedValue = props
            .replace(regex, "")
            .replace('(', '')
            .replace(')', '')
            .replace('+', '')
        return formattedValue
    }
    return;
}
