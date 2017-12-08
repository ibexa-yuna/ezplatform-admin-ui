(function (global, doc) {
    const eZ = global.eZ = global.eZ || {};

    eZ.BaseFieldValidator = class BaseFieldValidator {
        constructor(config) {
            this.classInvalid = config.classInvalid;
            this.eventsMap = config.eventsMap;
            this.fieldSelector = config.fieldSelector;
            this.fieldContainer = config.fieldContainer;
            this.fieldsToValidate = [];
            this.isValid = this.isValid.bind(this);
        }

        /**
         * Attaches event to given selector
         *
         * @method attachEvent
         * @param {String} eventName
         * @param {String} selector
         * @param {Function} validateField
         * @memberof BaseFieldValidator
         */
        attachEvent(config) {
            const container = this.fieldContainer ? this.fieldContainer : doc;

            [...container.querySelectorAll(config.selector)].forEach(item => {
                const isValueValidator = typeof config.isValueValidator !== 'undefined' ? config.isValueValidator : true;

                this.fieldsToValidate.push({
                    item,
                    isValueValidator,
                    callback: config.validateField
                });

                item.addEventListener(config.eventName, config.validateField, false);
                item.addEventListener('checkIsValid', this.isValid, false);
            });
        }

        /**
         * Removes event from a node found by a given selector
         *
         * @method removeEvent
         * @param {String} eventName
         * @param {String} selector
         * @param {Function} callback
         * @memberof BaseFieldValidator
         */
        removeEvent(eventName, selector, callback) {
            const container = this.fieldContainer ? this.fieldContainer : doc;

            [...container.querySelectorAll(selector)].forEach(item => {
                item.removeEventListener('checkIsValid', this.isValid, false);
                item.removeEventListener(eventName, callback, false);
            });
        }

        /**
         * Finds nodes to add validation state
         *
         * @method findValidationStateNodes
         * @param {HTMLElement} fieldNode
         * @param {HTMLElement} input
         * @param {Array} selectors
         * @returns {Array}
         * @memberof BaseFieldValidator
         */
        findValidationStateNodes(fieldNode, input, selectors = []) {
            return selectors.reduce((total, selector) => total.concat([...fieldNode.querySelectorAll(selector)]), []);
        }

        /**
         * Toggles the invalid state
         *
         * @method toggleInvalidState
         * @param {Boolean} isError
         * @param {Object} config
         * @param {HTMLElement} input
         * @memberof BaseFieldValidator
         */
        toggleInvalidState(isError, config, input) {
            const fieldNode = this.fieldContainer ? this.fieldContainer : input.closest(this.fieldSelector);
            const methodName = isError ? 'add' : 'remove';
            const nodes = this.findValidationStateNodes(fieldNode, input, config.invalidStateSelectors);

            fieldNode.classList[methodName](this.classInvalid);
            input.classList[methodName](this.classInvalid);

            nodes.forEach(el => el.classList[methodName](this.classInvalid));
        }

        /**
         * Creates an error node
         *
         * @method createErrorNode
         * @param {String} message
         * @returns {HTMLElement}
         * @memberof BaseFieldValidator
         */
        createErrorNode(message) {
            const errorNode = doc.createElement('em');

            errorNode.classList.add('ez-field-edit__error');
            errorNode.innerHTML = message;

            return errorNode;
        }

        /**
         * Finds the error containers
         *
         * @method findErrorContainers
         * @param {HTMLElement} fieldNode
         * @param {HTMLElement} input
         * @param {Array} selectors
         * @returns {Array}
         * @memberof BaseFieldValidator
         */
        findErrorContainers(fieldNode, input, selectors) {
            return selectors.reduce((total, selector) => total.concat([...fieldNode.querySelectorAll(selector)]), []);
        }

        /**
         * Finds the existing error nodes
         *
         * @method findExistingErrorNodes
         * @param {HTMLElement} fieldNode
         * @param {HTMLElement} input
         * @param {Array} selectors
         * @returns {Array}
         * @memberof BaseFieldValidator
         */
        findExistingErrorNodes(fieldNode, input, selectors) {
            return this.findErrorContainers(fieldNode, input, selectors);
        }

        /**
         * Toggles the error message
         *
         * @method toggleErrorMessage
         * @param {Object} validationResult
         * @param {Object} config
         * @param {HTMLElement} input
         * @memberof BaseFieldValidator
         */
        toggleErrorMessage(validationResult, config, input) {
            const fieldNode = this.fieldContainer ? this.fieldContainer : input.closest(this.fieldSelector);
            const nodes = this.findErrorContainers(fieldNode, input, config.errorNodeSelectors);
            const existingErrorSelectors = config.errorNodeSelectors.map(selector => selector + ' .ez-field-edit__error');
            const existingErrorNodes = this.findExistingErrorNodes(fieldNode, input, existingErrorSelectors);

            existingErrorNodes.forEach(el => el.remove());

            if (validationResult.isError) {
                const errorNode = this.createErrorNode(validationResult.errorMessage);

                nodes.forEach(el => el.append(errorNode));
            }
        }

        /**
         * Validates the field
         *
         * @method validateField
         * @param {Object} config
         * @param {Event} event
         * @memberof BaseFieldValidator
         */
        validateField(config, event) {
            const validationResult = this[config.callback](event);

            if (!validationResult) {
                return;
            }

            this.toggleInvalidState(validationResult.isError, config, event.target);
            this.toggleErrorMessage(validationResult, config, event.target);

            return validationResult;
        }

        /**
         * Attaches event listeners based on a config.
         *
         * @method init
         * @memberof BaseFieldValidator
         */
        init() {
            this.fieldsToValidate = [];
            this.eventsMap.forEach(eventConfig => {
                eventConfig.validateField = this.validateField.bind(this, eventConfig);

                this.attachEvent(eventConfig);
            });
        }

        /**
         * Removes event listeners and attaches again.
         *
         * @method reinit
         * @memberof BaseFieldValidator
         */
        reinit() {
            this.eventsMap.forEach(({eventName, selector, validateField}) => this.removeEvent(eventName, selector, validateField));
            this.init();
        }

        /**
         * Cancels all errors
         *
         * @method cancelErrors
         * @returns {Object}
         */
        cancelErrors() {
            return { isError: false };
        }

        /**
         * Checks whether field values are valid
         *
         * @method isValid
         * @returns {Boolean}
         */
        isValid() {
            if (!this.fieldsToValidate.length) {
                return true;
            }

            const results = [];

            this.fieldsToValidate.forEach(field => {
                if (field.isValueValidator) {
                    results.push(field.callback({
                        target: field.item,
                        currentTarget: field.item
                    }));
                }
            });

            return results.every(result => !result.isError);
        }
    };
})(window, document);
