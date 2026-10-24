"use strict";

/* =========================================================
   SHINMIRAI WEB BUILDER
   Main Application Controller
========================================================= */

const Builder = {
   state: {
    selected: null,
    elements: [],
    nextId: 1,

    codeTab: "html",
    preview: "desktop",

    history: [],
    historyIndex: -1,
    restoringHistory: false
},
    elements: {},

    fields: {},

    init() {
        this.cacheElements();
        this.registerTemplates();
        this.bindEvents();
        this.updateCode();

        console.log(
            "ShinMirai Web Builder initialized."
        );
    },
    /* =====================================================
   HISTORY
===================================================== */

saveHistory() {

    if (this.state.restoringHistory) {
        return;
    }

    const snapshot = this.createSnapshot();

    const current =
        this.state.history[
            this.state.historyIndex
        ];

    if (
        current &&
        current === snapshot
    ) {
        return;
    }

    this.state.history =
        this.state.history.slice(
            0,
            this.state.historyIndex + 1
        );

    this.state.history.push(
        snapshot
    );

    this.state.historyIndex =
        this.state.history.length - 1;

    this.updateHistoryButtons();
},

createSnapshot() {

    return JSON.stringify({
        nextId: this.state.nextId,

        elements:
            this.state.elements.map(item => ({
                id: item.id,
                type: item.type,
                html:
                    item.element.outerHTML
            }))
    });
},

undo() {

    if (
        this.state.historyIndex <= 0
    ) {
        return;
    }

    this.state.historyIndex--;

    this.restoreSnapshot(
        this.state.history[
            this.state.historyIndex
        ]
    );
},

redo() {

    if (
        this.state.historyIndex >=
        this.state.history.length - 1
    ) {
        return;
    }

    this.state.historyIndex++;

    this.restoreSnapshot(
        this.state.history[
            this.state.historyIndex
        ]
    );
},

restoreSnapshot(snapshot) {

    if (!snapshot) return;

    const data =
        JSON.parse(snapshot);

    this.state.restoringHistory =
        true;

    this.state.elements.forEach(
        item => item.element.remove()
    );

    this.state.elements = [];

    this.state.selected = null;

    this.state.nextId =
        data.nextId;

    data.elements.forEach(item => {

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.innerHTML =
            item.html;

        const element =
            wrapper.firstElementChild;

        if (!element) return;

        element.dataset.builderId =
            item.id;

        element.dataset.elementType =
            item.type;

        this.prepareElement(
            element
        );

        this.dom.canvas.appendChild(
            element
        );

        this.state.elements.push({
            id: item.id,
            type: item.type,
            element
        });
    });

    this.state.restoringHistory =
        false;

    this.clearSelection();

    this.updateLayers();

    this.updateCode();

    this.updateHistoryButtons();
},

updateHistoryButtons() {

    const undo =
        document.getElementById(
            "undoButton"
        );

    const redo =
        document.getElementById(
            "redoButton"
        );

    if (undo) {
        undo.disabled =
            this.state.historyIndex <= 0;
    }

    if (redo) {
        redo.disabled =
            this.state.historyIndex >=
            this.state.history.length - 1;
    }
},

    /* =====================================================
       CACHE DOM ELEMENTS
    ===================================================== */

    cacheElements() {
        this.dom = {
            canvas: document.getElementById("canvas"),
            canvasEmpty:
                document.getElementById("canvasEmpty"),

            properties:
                document.getElementById("properties"),

            propertiesEmpty:
                document.getElementById(
                    "propertiesEmpty"
                ),

            contentProperties:
                document.getElementById(
                    "contentProperties"
                ),

            styleProperties:
                document.getElementById(
                    "styleProperties"
                ),

            codeOutput:
                document.querySelector(
                    "#codeOutput code"
                ),

            projectStatus:
                document.getElementById(
                    "projectStatus"
                )
        };

        this.fields = {
            text:
                document.getElementById(
                    "elementText"
                ),

            size:
                document.getElementById(
                    "elementSize"
                ),

            align:
                document.getElementById(
                    "elementAlign"
                ),

            width:
                document.getElementById(
                    "elementWidth"
                ),

            height:
                document.getElementById(
                    "elementHeight"
                ),

            fontFamily:
                document.getElementById(
                    "fontFamily"
                ),

            fontWeight:
                document.getElementById(
                    "fontWeight"
                ),

            lineHeight:
                document.getElementById(
                    "lineHeight"
                ),

            letterSpacing:
                document.getElementById(
                    "letterSpacing"
                ),

            textColor:
                document.getElementById(
                    "textColor"
                ),

            backgroundColor:
                document.getElementById(
                    "backgroundColor"
                ),

            borderWidth:
                document.getElementById(
                    "borderWidth"
                ),

            borderStyle:
                document.getElementById(
                    "borderStyle"
                ),

            borderColor:
                document.getElementById(
                    "borderColor"
                ),

            borderRadius:
                document.getElementById(
                    "borderRadius"
                ),

            margin:
                document.getElementById(
                    "elementMargin"
                ),

            padding:
                document.getElementById(
                    "elementPadding"
                )
        };
    },

    /* =====================================================
       ELEMENT TEMPLATES
    ===================================================== */

    registerTemplates() {

        this.elements = {

            heading: () => {
                const el =
                    document.createElement("h1");

                el.textContent =
                    "Your Heading";

                return el;
            },

            paragraph: () => {
                const el =
                    document.createElement("p");

                el.textContent =
                    "Your paragraph text goes here.";

                return el;
            },

            button: () => {
                const el =
                    document.createElement(
                        "button"
                    );

                el.type = "button";
                el.textContent = "Click Me";

                return el;
            },

            link: () => {
                const el =
                    document.createElement("a");

                el.href = "#";
                el.textContent =
                    "Learn More";

                return el;
            },

            divider: () => {
                return document.createElement(
                    "hr"
                );
            },

            section: () => {

                const section =
                    document.createElement(
                        "section"
                    );

                const heading =
                    document.createElement(
                        "h2"
                    );

                heading.textContent =
                    "Section";

                const paragraph =
                    document.createElement(
                        "p"
                    );

                paragraph.textContent =
                    "Section content.";

                section.append(
                    heading,
                    paragraph
                );

                return section;
            },

            container: () => {

                const container =
                    document.createElement(
                        "div"
                    );

                container.className =
                    "builder-container";

                container.textContent =
                    "Container";

                return container;
            },

            columns: () => {

                const columns =
                    document.createElement(
                        "div"
                    );

                columns.className =
                    "builder-columns";

                const column1 =
                    document.createElement(
                        "div"
                    );

                column1.textContent =
                    "Column 1";

                const column2 =
                    document.createElement(
                        "div"
                    );

                column2.textContent =
                    "Column 2";

                columns.append(
                    column1,
                    column2
                );

                return columns;
            },

            image: () => {

                const image =
                    document.createElement(
                        "img"
                    );

                image.src =
                    "data:image/svg+xml," +
                    encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="600"
                             height="300">
                            <rect width="100%"
                                  height="100%"
                                  fill="#eeeeee"/>
                            <text x="50%"
                                  y="50%"
                                  text-anchor="middle"
                                  dominant-baseline="middle"
                                  font-family="Arial"
                                  font-size="28">
                                Image
                            </text>
                        </svg>
                    `);

                image.alt =
                    "Website image";

                return image;
            },

            video: () => {

                const video =
                    document.createElement(
                        "video"
                    );

                video.controls = true;

                video.setAttribute(
                    "aria-label",
                    "Video"
                );

                return video;
            },

            input: () => {

                const input =
                    document.createElement(
                        "input"
                    );

                input.type = "text";

                input.placeholder =
                    "Enter text...";

                return input;
            },

            textarea: () => {

                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.placeholder =
                    "Enter your message...";

                return textarea;
            },

            checkbox: () => {

                const label =
                    document.createElement(
                        "label"
                    );

                const checkbox =
                    document.createElement(
                        "input"
                    );

                checkbox.type =
                    "checkbox";

                label.append(
                    checkbox,
                    document.createTextNode(
                        " I agree"
                    )
                );

                return label;
            },

            form: () => {

                const form =
                    document.createElement(
                        "form"
                    );

                const input =
                    document.createElement(
                        "input"
                    );

                input.type = "text";

                input.placeholder =
                    "Your name";

                const button =
                    document.createElement(
                        "button"
                    );

                button.type = "submit";

                button.textContent =
                    "Submit";

                form.append(
                    input,
                    button
                );

                return form;
            }
        };
    },

    /* =====================================================
       EVENT REGISTRATION
    ===================================================== */

    bindEvents() {
        document.getElementById("undoButton")?.addEventListener("click", () => this.undo());
        document.getElementById("redoButton")?.addEventListener("click", () => this.redo());
        document.getElementById("duplicateButton")?.addEventListener("click", () => this.duplicateSelected());
        document.getElementById("deleteButton")?.addEventListener("click", () => this.deleteSelected());


        document
            .querySelectorAll(
                ".element-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.addElement(
                            button.dataset.element
                        );
                    }
                );
            });


        Object.values(
            this.fields
        ).forEach(field => {

            if (!field) return;

            field.addEventListener(
                "input",
                () => {
                    this.applyProperties();
                }
            );

            field.addEventListener(
                "change",
                () => {
                    this.applyProperties();
                }
            );
        });


        document
            .querySelectorAll(
                ".property-tab"
            )
            .forEach(tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        this.switchPropertyTab(
                            tab.dataset.panel
                        );
                    }
                );
            });


        document
            .querySelectorAll(
                ".code-tab"
            )
            .forEach(tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        this.switchCodeTab(
                            tab.dataset.code
                        );
                    }
                );
            });


        document
            .querySelectorAll(
                ".preview-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.setPreviewMode(
                            button.dataset.preview
                        );
                    }
                );
            });


        document
            .getElementById(
                "newProject"
            )
            ?.addEventListener(
                "click",
                () => {
                    this.newProject();
                }
            );


        document
            .getElementById(
                "saveProject"
            )
            ?.addEventListener(
                "click",
                () => {
                    this.saveProject();
                }
            );


        document
            .getElementById(
                "exportProject"
            )
            ?.addEventListener(
                "click",
                () => {
                    this.exportProject();
                }
            );


        this.dom.canvas
            ?.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        this.dom.canvas
                    ) {
                        this.clearSelection();
                    }
                }
                
            );
            document.addEventListener(
    "keydown",
    event => {

        const tag =
            document.activeElement?.tagName;

        const editing =
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT";

        if (editing) return;

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "z"
        ) {
            event.preventDefault();

            if (event.shiftKey) {
                this.redo();
            } else {
                this.undo();
            }
        }

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "y"
        ) {
            event.preventDefault();

            this.redo();
        }

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "d"
        ) {
            event.preventDefault();

            this.duplicateSelected();
        }

        if (
            event.key === "Delete"
        ) {
            this.deleteSelected();
        }
    }
);
    },

    duplicateSelected() {
        const selected = this.state.selected;
        if (!selected) return;
        const record = this.state.elements.find(item => item.element === selected);
        if (!record) return;
        const clone = selected.cloneNode(true);
        const id = `builder-${this.state.nextId++}`;
        clone.dataset.builderId = id;
        clone.dataset.elementType = record.type;
        this.prepareElement(clone);
        selected.after(clone);
        const index = this.state.elements.indexOf(record);
        this.state.elements.splice(index + 1, 0, { id, type: record.type, element: clone });
        this.selectElement(clone);
        this.setStatus("Unsaved Changes");
        this.updateLayers();
        this.updateCode();
        this.saveHistory();
    },

    deleteSelected() {
        const selected = this.state.selected;
        if (!selected) return;
        this.state.elements = this.state.elements.filter(item => item.element !== selected);
        selected.remove();
        this.state.selected = null;
        if (!this.state.elements.length) {
            this.dom.canvas.innerHTML = '<div class="canvas-empty" id="canvasEmpty"><h1>Start Building</h1><p>Select an element from the left panel.</p></div>';
        }
        this.clearSelection();
        this.setStatus("Unsaved Changes");
        this.updateLayers();
        this.updateCode();
        this.saveHistory();
    },

    updateLayers() {
        const list = document.getElementById("layersList");
        const count = document.getElementById("layerCount");
        if (!list || !count) return;
        count.textContent = String(this.state.elements.length);
        list.innerHTML = "";
        if (!this.state.elements.length) {
            list.innerHTML = '<div class="layers-empty">No elements yet</div>';
            return;
        }
        [...this.state.elements].reverse().forEach(item => {
            const row = document.createElement("button");
            row.type = "button";
            row.className = "layer-item" + (item.element === this.state.selected ? " active" : "");
            row.innerHTML = `<span class="layer-type">${item.type}</span><span>${item.element.textContent.trim().slice(0, 28) || item.type}</span>`;
            row.addEventListener("click", () => this.selectElement(item.element));
            list.appendChild(row);
        });
    },

    /* =====================================================
       ADD ELEMENT
    ===================================================== */

    addElement(type) {

        const factory =
            this.elements[type];

        if (!factory) {
            console.warn(
                `Unknown element: ${type}`
            );

            return;
        }

        const element =
            factory();

        const id =
            `builder-${this.state.nextId++}`;

        element.dataset.builderId =
            id;

        element.dataset.elementType =
            type;

        this.prepareElement(
            element
        );

        this.dom.canvasEmpty?.remove();

        this.dom.canvas.appendChild(
            element
        );

        this.state.elements.push({
            id,
            type,
            element
        });

        this.selectElement(
            element
        );

        this.setStatus(
            "Unsaved Changes"
        );

        this.updateCode();
    },

    /* =====================================================
       PREPARE ELEMENT
    ===================================================== */

    prepareElement(element) {

        element.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                this.selectElement(
                    element
                );
            }
        );
    },

    /* =====================================================
       SELECT
    ===================================================== */

    selectElement(element) {

        if (this.state.selected) {

            this.state.selected
                .classList
                .remove(
                    "builder-element"
                );
        }

        this.state.selected =
            element;

        element.classList.add(
            "builder-element"
        );

        this.dom.properties.hidden =
            false;

        if (
            this.dom.propertiesEmpty
        ) {
            this.dom.propertiesEmpty.hidden =
                true;
        }

        this.loadProperties(
            element
        );
    },

    /* =====================================================
       CLEAR SELECTION
    ===================================================== */

    clearSelection() {

        if (this.state.selected) {

            this.state.selected
                .classList
                .remove(
                    "builder-element"
                );
        }

        this.state.selected =
            null;

        this.dom.properties.hidden =
            true;

        if (
            this.dom.propertiesEmpty
        ) {
            this.dom.propertiesEmpty.hidden =
                false;
        }
    },

    /* =====================================================
       LOAD PROPERTIES
    ===================================================== */

    loadProperties(element) {

        if (!element) return;

        const style =
            getComputedStyle(
                element
            );

        this.fields.text.value =
            element.textContent.trim();

        this.fields.size.value =
            parseInt(
                style.fontSize,
                10
            ) || 16;

        this.fields.align.value =
            element.style.textAlign ||
            "left";

        this.fields.width.value =
            element.style.width || "";

        this.fields.height.value =
            element.style.height || "";

        this.fields.fontFamily.value =
            element.style.fontFamily ||
            "Arial, sans-serif";

        this.fields.fontWeight.value =
            element.style.fontWeight ||
            "400";

        this.fields.lineHeight.value =
            element.style.lineHeight || "";

        this.fields.letterSpacing.value =
            element.style.letterSpacing || "";

        this.fields.textColor.value =
            this.rgbToHex(
                style.color
            );

        this.fields.backgroundColor.value =
            this.rgbToHex(
                style.backgroundColor
            );

        this.fields.borderWidth.value =
            element.style.borderWidth || "";

        this.fields.borderStyle.value =
            element.style.borderStyle ||
            "none";

        this.fields.borderColor.value =
            this.rgbToHex(
                style.borderColor
            );

        this.fields.borderRadius.value =
            element.style.borderRadius || "";

        this.fields.margin.value =
            element.style.margin || "";

        this.fields.padding.value =
            element.style.padding || "";
    },

    /* =====================================================
       APPLY PROPERTIES
    ===================================================== */

    applyProperties() {

        const element =
            this.state.selected;

        if (!element) return;

        const type =
            element.dataset.elementType;

        if (
            type !== "section" &&
            type !== "columns" &&
            type !== "form"
        ) {

            if (
                this.fields.text
            ) {
                element.textContent =
                    this.fields.text.value;
            }
        }

        this.setStyle(
            element,
            "fontSize",
            this.withUnit(
                this.fields.size.value,
                "px"
            )
        );

        this.setStyle(
            element,
            "textAlign",
            this.fields.align.value
        );

        this.setStyle(
            element,
            "width",
            this.fields.width.value
        );

        this.setStyle(
            element,
            "height",
            this.fields.height.value
        );

        this.setStyle(
            element,
            "fontFamily",
            this.fields.fontFamily.value
        );

        this.setStyle(
            element,
            "fontWeight",
            this.fields.fontWeight.value
        );

        this.setStyle(
            element,
            "lineHeight",
            this.fields.lineHeight.value
        );

        this.setStyle(
            element,
            "letterSpacing",
            this.fields.letterSpacing.value
        );

        this.setStyle(
            element,
            "color",
            this.fields.textColor.value
        );

        this.setStyle(
            element,
            "backgroundColor",
            this.fields.backgroundColor.value
        );

        this.setStyle(
            element,
            "borderWidth",
            this.fields.borderWidth.value
        );

        this.setStyle(
            element,
            "borderStyle",
            this.fields.borderStyle.value
        );

        this.setStyle(
            element,
            "borderColor",
            this.fields.borderColor.value
        );

        this.setStyle(
            element,
            "borderRadius",
            this.fields.borderRadius.value
        );

        this.setStyle(
            element,
            "margin",
            this.fields.margin.value
        );

        this.setStyle(
            element,
            "padding",
            this.fields.padding.value
        );

        this.setStatus(
            "Unsaved Changes"
        );

        this.updateCode();
    },

    /* =====================================================
       STYLE HELPERS
    ===================================================== */

    setStyle(
        element,
        property,
        value
    ) {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            element.style[property] =
                "";

            return;
        }

        element.style[property] =
            value;
    },

    withUnit(
        value,
        unit
    ) {

        if (!value) {
            return "";
        }

        const text =
            String(value).trim();

        if (
            text === "auto" ||
            text.endsWith(unit) ||
            text.endsWith("%") ||
            text.endsWith("rem") ||
            text.endsWith("em")
        ) {
            return text;
        }

        return `${text}${unit}`;
    },

    /* =====================================================
       PROPERTY TABS
    ===================================================== */

    switchPropertyTab(panel) {

        document
            .querySelectorAll(
                ".property-tab"
            )
            .forEach(tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.panel ===
                    panel
                );
            });

        if (
            this.dom.contentProperties
        ) {
            this.dom.contentProperties.hidden =
                panel !== "content";
        }

        if (
            this.dom.styleProperties
        ) {
            this.dom.styleProperties.hidden =
                panel !== "style";
        }
    },

    /* =====================================================
       CODE
    ===================================================== */

    switchCodeTab(tab) {

        document
            .querySelectorAll(
                ".code-tab"
            )
            .forEach(item => {

                item.classList.toggle(
                    "active",
                    item.dataset.code ===
                    tab
                );
            });

        this.state.codeTab =
            tab;

        this.updateCode();
    },

    updateCode() {

        if (!this.dom.codeOutput) {
            return;
        }

        let output = "";

        if (
            this.state.codeTab ===
            "css"
        ) {
            output =
                this.generateCSS();
        }

        else if (
            this.state.codeTab ===
            "js"
        ) {
            output =
                this.generateJS();
        }

        else {
            output =
                this.generateHTML();
        }

        this.dom.codeOutput.textContent =
            output ||
            "No code generated yet.";
    },

    generateHTML() {

        return this.state.elements
            .map(item => {

                const clone =
                    item.element
                        .cloneNode(true);

                clone.classList.remove(
                    "builder-element"
                );

                clone.removeAttribute(
                    "data-builder-id"
                );

                clone.removeAttribute(
                    "data-element-type"
                );

                return clone.outerHTML;

            })
            .join("\n\n");
    },

    generateCSS() {

        return `* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

button {
    cursor: pointer;
}

section {
    padding: 20px;
}

img {
    max-width: 100%;
    height: auto;
}
`;
    },

    generateJS() {

        return `document
    .querySelectorAll("button")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                console.log(
                    "Button clicked"
                );
            }
        );
    });
`;
    },

    /* =====================================================
       PREVIEW
    ===================================================== */

    setPreviewMode(mode) {

        this.state.preview =
            mode;

        document
            .querySelectorAll(
                ".preview-button"
            )
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.preview ===
                    mode
                );
            });

        if (!this.dom.canvas) {
            return;
        }

        if (mode === "desktop") {

            this.dom.canvas.style.maxWidth =
                "1000px";
        }

        if (mode === "tablet") {

            this.dom.canvas.style.maxWidth =
                "768px";
        }

        if (mode === "mobile") {

            this.dom.canvas.style.maxWidth =
                "390px";
        }
    },

    /* =====================================================
       NEW PROJECT
    ===================================================== */

    newProject() {

        if (
            this.state.elements.length &&
            !confirm(
                "Start a new project? Unsaved changes will be lost."
            )
        ) {
            return;
        }

        this.state.elements.forEach(
            item => {
                item.element.remove();
            }
        );

        this.state.elements = [];
        this.state.selected = null;
        this.state.nextId = 1;

        this.dom.properties.hidden =
            true;

        if (
            this.dom.propertiesEmpty
        ) {
            this.dom.propertiesEmpty.hidden =
                false;
        }

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "canvas-empty";

        empty.id =
            "canvasEmpty";

        empty.innerHTML = `
            <h1>Start Building</h1>
            <p>
                Select an element from
                the left panel.
            </p>
        `;

        this.dom.canvas.appendChild(
            empty
        );

        this.setStatus(
            "New Project"
        );

        this.updateCode();
    },

    /* =====================================================
       SAVE PROJECT
    ===================================================== */

    saveProject() {

        const project = {
            version: 3,

            createdWith:
                "ShinMirai Web Builder",

            elements:
                this.state.elements.map(
                    item => ({
                        id: item.id,
                        type: item.type,
                        html:
                            item.element
                                .outerHTML
                    })
                )
        };

        try {

            localStorage.setItem(
                "shinmirai-web-builder",
                JSON.stringify(project)
            );

            this.setStatus(
                "Saved"
            );

        } catch (error) {

            console.error(
                "Save failed:",
                error
            );

            this.setStatus(
                "Save Failed"
            );
        }
    },

    /* =====================================================
       EXPORT
    ===================================================== */

    exportProject() {

        const html =
            this.generateHTML();

        const css =
            this.generateCSS();

        const js =
            this.generateJS();

        const documentHTML =
`<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width,
        initial-scale=1.0"
    >

    <title>My Website</title>

    <link
        rel="stylesheet"
        href="style.css"
    >

</head>

<body>

${html}



</body>

</html>`;

        this.download(
            "index.html",
            documentHTML,
            "text/html"
        );

        this.download(
            "style.css",
            css,
            "text/css"
        );

        this.download(
            "script.js",
            js,
            "text/javascript"
        );

        this.setStatus(
            "Exported"
        );
    },

    /* =====================================================
       DOWNLOAD
    ===================================================== */

    download(
        filename,
        content,
        type
    ) {

        const blob =
            new Blob(
                [content],
                { type }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;
        link.download = filename;

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

        URL.revokeObjectURL(
            url
        );
    },

    /* =====================================================
       STATUS
    ===================================================== */

    setStatus(text) {

        if (
            this.dom.projectStatus
        ) {
            this.dom.projectStatus.textContent =
                text;
        }
    },

    /* =====================================================
       COLOR CONVERSION
    ===================================================== */

    rgbToHex(color) {

        if (!color) {
            return "#000000";
        }

        if (
            color.startsWith("#")
        ) {
            return color;
        }

        const values =
            color.match(/\d+/g);

        if (
            !values ||
            values.length < 3
        ) {
            return "#000000";
        }

        return "#" +
            values
                .slice(0, 3)
                .map(value =>
                    Number(value)
                        .toString(16)
                        .padStart(2, "0")
                )
                .join("");
    }
};

// Initialize the builder after both React-rendered markup and controller are available.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => Builder.init(), { once: true });
} else {
    Builder.init();
}
