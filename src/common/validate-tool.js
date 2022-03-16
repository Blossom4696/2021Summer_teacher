export const requiredName = (nameMap) => {
    const rules = {};
    const messages = {};
    Object.keys(nameMap).forEach((name) => {
        rules[name] = {
            required: true,
        };
        messages[name] = {required: nameMap[name]}
    })
    return {rules, messages};
}