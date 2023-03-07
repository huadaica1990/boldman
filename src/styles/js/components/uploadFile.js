
Ecsgroup.uploadFile = function (selector) {
    if (document.querySelector(selector) != null) {
        function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
        const fileManager = document.querySelector(selector);
        class FileManager {
            constructor(containerElement) {
                _defineProperty(this, "_addEventListeners", () => {
                    this._fakeInput.addEventListener("click", this._handleFakeInputClick, false);

                    this._realInput.addEventListener("change", this._handleRealInputChange, false);

                    this._removeFilesButton.addEventListener("click", this._handleRemoveFilesButtonClick, false);
                });

                _defineProperty(this, "_handleFakeInputClick", () => {
                    if (this._chipContainer.querySelectorAll(".chip").length > 0) {
                        this._removeChips();
                    }

                    this._realInput.click();
                });

                _defineProperty(this, "_handleRealInputChange", e => {
                    if (this._realInput.files.length > 0) {
                        [...this._realInput.files].forEach(file => {
                            const name = file.name;
                            const id = FileManager.generateId();
                            const chipTemplate = FileManager.chipTemplate(name, id);


                            const chip = this._chipContainer.querySelector(`#${id}`);

                            const filesObj = {
                                name,
                                id,
                                chip: chip
                            };

                            this._files.push(filesObj);
                            console.log(this);
                            UpdateFile(this, $(this._realInput).data('url'), chipTemplate);
                            //this._chipContainer.insertAdjacentHTML("beforeend", chipTemplate);
                        });
                    }
                });

                _defineProperty(this, "_handleRemoveFilesButtonClick", e => {
                    if (this._realInput.files.length) {
                        this._removeChips();
                    }
                });

                _defineProperty(this, "_removeChips", () => {
                    const chips = [...this._chipContainer.querySelectorAll(".chip")];
                    DeleteFile(this._realvalueInput.value);
                    this._toggleNoFile();
                    this._files = [];
                    this._chipContainer.innerHTML = "";
                    this._realInput.value = "";
                    this._realvalueInput.value = "";
                });

                _defineProperty(this, "_toggleNoFile", () => {
                    this._noFile.hidden = !this._noFile.hidden;
                    this._removeFilesButton.hidden = !this._removeFilesButton.hidden;
                });

                this._containerElement = containerElement;
                this._fakeInput = this._containerElement.querySelector("[js-fake-file-input]");
                this._realInput = this._containerElement.querySelector("[js-real-file-input]");
                this._realvalueInput = this._containerElement.querySelector("[js-real-value-file-input]");
                this._chipContainer = this._containerElement.querySelector("[js-chip-container]");
                this._noFile = this._containerElement.querySelector("[js-no-file]");
                this._removeFilesButton = this._containerElement.querySelector("[js-remove-files]");
                this._files = [];

                this._addEventListeners();
            }
        }

        _defineProperty(FileManager, "chipTemplate", (text, id) => {
            return `<span id="${id}" class="chip"><span class="chip__text">${text}</span></span>`;
        });

        _defineProperty(FileManager, "generateId", () => {
            return `chip-${(Math.random() * 0xffffff << 0).toString(16)}`;
        });
        return new FileManager(fileManager);
    }
};