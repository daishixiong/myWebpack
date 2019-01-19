'use strict';
export default {
    SET_HEADERS_CHAINID(state, value) {
        console.log('我被触发了', value);
        state.chainId = value;
    }
};
