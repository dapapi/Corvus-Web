let common = {
    timeProcessing(value, type = 'minutes') {
        if (!value || !value.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/)) {
            return value
        }
        if (type === 'minutes') {
            value = value.split(':');
            value.pop();
            value = value.join(':');
            return value
        } else if (type === 'day') {
            value = value.split(' ');
            return value[0]
        }
    }
};

export default common
