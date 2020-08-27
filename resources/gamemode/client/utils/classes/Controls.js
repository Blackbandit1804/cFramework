import * as alt from 'alt';
import * as native from 'natives';

let disabledControls = [];
let enabledInputs = [];

/**
 *  Disabled specified input groups
 *
 * @param {Integer} args - Input groups to disable
 * @return {undefined}
 */
export const disableControls = (...args) => {
    disabledControls.push(...args);
};

/**
 * Enable all controls
 *
 * @return {undefined}
 */
export const enableAllControls = () => {
    disabledControls = [];
};

/**
 * Enable an input
 *
 * @param {Object} Input - input object
 * @param {Number} Input.group - input's group
 * @param {Number} Input.control - input's control action
 */
export const enableInput = (...args) => {
    enabledInputs.push(...args);
};

/**
 * Clear all inputs
 *
 */
export const clearAllInputs = () => {
    enabledInputs = [];
};

alt.everyTick(() => {
    if (disabledControls.length > 0) {
        disabledControls.forEach((inputGroup) => {
            native.disableAllControlActions(inputGroup);
        });
    }
    if (enabledInputs.length > 0) {
        enabledInputs.forEach((input) => {
            if (Array.isArray(input.control)) input.control.forEach((control) => native.enableControlAction(input.group, control, true));
            else native.disableControlAction(input.group, input.control, true);
        });
    }
});