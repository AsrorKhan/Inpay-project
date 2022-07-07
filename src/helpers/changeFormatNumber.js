export const changeFormatPhoneNumber = (props) => {
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
