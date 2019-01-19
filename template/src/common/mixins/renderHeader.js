export default {
    methods: {
        // set element UI table column lable inline
        renderHeaderInline(h, l, fontSize) {
            let f = 14;
            if (typeof fontSize !== 'undefined' && fontSize != null) {
                f = fontSize;
            }
            let calcWidth = f * l.column.label.length + 32;
            l.column.minWidth = calcWidth;
            return l.column.label;
        }
    }
};
