const appMarkup = `

    <!-- ================= HEADER ================= -->

    <header class="builder-header">

        <div class="brand">
            Found-Ark
        </div>

        <div class="header-actions">

            <button
                type="button"
                class="button button--secondary"
                id="newProject"
            >
                New
            </button>

            <button
                type="button"
                class="button button--secondary"
                id="saveProject"
            >
                Save
            </button>

            <button
                type="button"
                class="button button--primary"
                id="exportProject"
            >
                Export
            </button>

        </div>
        <div class="editor-actions">
    <button
        type="button"
        id="undoButton"
        title="Undo (Ctrl+Z)"
    >
        Undo
    </button>

    <button
        type="button"
        id="redoButton"
        title="Redo (Ctrl+Y)"
    >
        Redo
    </button>

    <button
        type="button"
        id="duplicateButton"
        title="Duplicate (Ctrl+D)"
    >
        Duplicate
    </button>

    <button
        type="button"
        id="deleteButton"
        title="Delete (Delete)"
    >
        Delete
    </button>
</div>

    </header>



    <!-- ================= BUILDER ================= -->

    <main class="builder">

        <!-- ================= ELEMENTS ================= -->

        <aside class="panel elements-panel">

            <div class="panel-header">
                <h2>Elements</h2>
            </div>
<div class="element-list">

    <div class="element-group">
        <h3>Basic</h3>

        <button
            type="button"
            class="element-button"
            data-element="heading"
        >
            Heading
        </button>

        <button
            type="button"
            class="element-button"
            data-element="paragraph"
        >
            Paragraph
        </button>

        <button
            type="button"
            class="element-button"
            data-element="button"
        >
            Button
        </button>

        <button
            type="button"
            class="element-button"
            data-element="link"
        >
            Link
        </button>

        <button
            type="button"
            class="element-button"
            data-element="divider"
        >
            Divider
        </button>
    </div>


    <div class="element-group">
        <h3>Layout</h3>

        <button
            type="button"
            class="element-button"
            data-element="section"
        >
            Section
        </button>

        <button
            type="button"
            class="element-button"
            data-element="container"
        >
            Container
        </button>

        <button
            type="button"
            class="element-button"
            data-element="columns"
        >
            Columns
        </button>
    </div>


    <div class="element-group">
        <h3>Media</h3>

        <button
            type="button"
            class="element-button"
            data-element="image"
        >
            Image
        </button>

        <button
            type="button"
            class="element-button"
            data-element="video"
        >
            Video
        </button>
    </div>


    <div class="element-group">
        <h3>Form</h3>

        <button
            type="button"
            class="element-button"
            data-element="input"
        >
            Input
        </button>

        <button
            type="button"
            class="element-button"
            data-element="textarea"
        >
            Textarea
        </button>

        <button
            type="button"
            class="element-button"
            data-element="checkbox"
        >
            Checkbox
        </button>

        <button
            type="button"
            class="element-button"
            data-element="form"
        >
            Form
        </button>
    </div>
    <section class="layers-panel">
    <div class="layers-header">
        <h2>Layers</h2>
        <span id="layerCount">0</span>
    </div>

    <div
        id="layersList"
        class="layers-list"
    >
        <div class="layers-empty">
            No elements yet
        </div>
    </div>
</section>

</div>

        </aside>


        <!-- ================= CANVAS ================= -->

        <section class="workspace">

            <div class="workspace-header">

                <div>
                    <span class="workspace-label">
                        Canvas
                    </span>

                    <span
                        class="project-status"
                        id="projectStatus"
                    >
                        New Project
                    </span>
                </div>

                <div class="preview-controls">

                    <button
                        type="button"
                        class="preview-button active"
                        data-preview="desktop"
                    >
                        Desktop
                    </button>

                    <button
                        type="button"
                        class="preview-button"
                        data-preview="tablet"
                    >
                        Tablet
                    </button>

                    <button
                        type="button"
                        class="preview-button"
                        data-preview="mobile"
                    >
                        Mobile
                    </button>

                </div>

            </div>


            <div class="canvas-area">

                <div
                    class="canvas"
                    id="canvas"
                >

                    <div
                        class="canvas-empty"
                        id="canvasEmpty"
                    >
                        <h1>
                            Start Building
                        </h1>

                        <p>
                            Select an element from
                            the left panel.
                        </p>
                    </div>

                </div>

            </div>

        </section>


        <!-- ================= PROPERTIES ================= -->

        <aside class="panel properties-panel">

            <div class="panel-header">
                <h2>Properties</h2>
            </div>

            <div
                class="properties-empty"
                id="propertiesEmpty"
            >
                <p>
                    Select an element to edit
                    its properties.
                </p>
            </div>


            <div class="property-tabs">
    <button
        type="button"
        class="property-tab active"
        data-panel="content"
    >
        Properties
    </button>

    <button
        type="button"
        class="property-tab"
        data-panel="style"
    >
        Style
    </button>
</div>

<div
    class="property-section"
    id="contentProperties"
>
    <label for="elementText">Text</label>
    <input
        type="text"
        id="elementText"
        class="input"
        placeholder="Element text"
    >

    <label for="elementSize">Font Size</label>
    <input
        type="number"
        id="elementSize"
        class="input"
        min="8"
        max="200"
        value="16"
    >

    <label for="elementAlign">Alignment</label>
    <select id="elementAlign" class="input">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
    </select>

    <label for="elementWidth">Width</label>
    <input
        type="text"
        id="elementWidth"
        class="input"
        placeholder="auto / 100% / 300px"
    >

    <label for="elementHeight">Height</label>
    <input
        type="text"
        id="elementHeight"
        class="input"
        placeholder="auto / 300px"
    >

    <div id="mediaControls" class="media-controls" hidden>
        <h3>Image / Video</h3>
        <label for="mediaSource">Image or video URL</label>
        <input type="url" id="mediaSource" class="input" placeholder="https://example.com/media.jpg">
        <label for="mediaUpload">Or choose a file</label>
        <input type="file" id="mediaUpload" class="input" accept="image/*,video/*">
        <p class="field-help">You can use an image/video URL or select a file from your device. File previews are embedded in the project while this page stays open.</p>
    </div>
</div>

<div
    class="property-section"
    id="styleProperties"
    hidden
>
    <h3>Typography</h3>

    <label for="fontFamily">Font Family</label>
    <select id="fontFamily" class="input">
        <option value="Arial, sans-serif">
            Arial
        </option>

        <option value="Georgia, serif">
            Georgia
        </option>

        <option value="'Courier New', monospace">
            Courier New
        </option>

        <option value="Verdana, sans-serif">
            Verdana
        </option>
    </select>

    <label for="fontWeight">Font Weight</label>
    <select id="fontWeight" class="input">
        <option value="400">Normal</option>
        <option value="500">Medium</option>
        <option value="600">Semi Bold</option>
        <option value="700">Bold</option>
        <option value="800">Extra Bold</option>
    </select>

    <label for="lineHeight">Line Height</label>
    <input
        type="text"
        id="lineHeight"
        class="input"
        placeholder="1.5"
    >

    <label for="letterSpacing">
        Letter Spacing
    </label>
    <input
        type="text"
        id="letterSpacing"
        class="input"
        placeholder="0px"
    >

    <label for="textColor">Text Color</label>
    <input
        type="color"
        id="textColor"
        class="color-input"
        value="#111111"
    >


    <h3>Background</h3>

    <label for="backgroundColor">
        Background Color
    </label>

    <input
        type="color"
        id="backgroundColor"
        class="color-input"
        value="#ffffff"
    >


    <h3>Border</h3>

    <label for="borderWidth">
        Border Width
    </label>

    <input
        type="text"
        id="borderWidth"
        class="input"
        placeholder="0px"
    >

    <label for="borderStyle">
        Border Style
    </label>

    <select id="borderStyle" class="input">
        <option value="none">None</option>
        <option value="solid">Solid</option>
        <option value="dashed">Dashed</option>
        <option value="dotted">Dotted</option>
    </select>

    <label for="borderColor">
        Border Color
    </label>

    <input
        type="color"
        id="borderColor"
        class="color-input"
        value="#000000"
    >

    <label for="borderRadius">
        Border Radius
    </label>

    <input
        type="text"
        id="borderRadius"
        class="input"
        placeholder="0px"
    >


    <h3>Spacing</h3>

    <label for="elementMargin">
        Margin
    </label>

    <input
        type="text"
        id="elementMargin"
        class="input"
        placeholder="0"
    >

    <label for="elementPadding">
        Padding
    </label>

    <input
        type="text"
        id="elementPadding"
        class="input"
        placeholder="0"
    >
</div>
        </aside>

    </main>


    <!-- ================= CODE PANEL ================= -->

    <section class="code-panel">

        <div class="code-panel-header">

            <h2>
                Generated Code
            </h2>

            <div class="code-tabs">

                <button
                    type="button"
                    class="code-tab active"
                    data-code="html"
                >
                    HTML
                </button>

                <button
                    type="button"
                    class="code-tab"
                    data-code="css"
                >
                    CSS
                </button>

                <button
                    type="button"
                    class="code-tab"
                    data-code="js"
                >
                    JavaScript
                </button>

            </div>

        </div>


        <pre
            class="code-output"
            id="codeOutput"
        ><code></code></pre>

    </section>

    <section id="authOverlay" class="auth-overlay" aria-label="Account access">
      <form id="authForm" class="auth-card">
        <h1>Found-Ark</h1>
        <p id="authIntro">Sign in to continue</p>
        <div class="auth-tabs">
          <button type="button" class="auth-tab active" data-auth-mode="login">Login</button>
          <button type="button" class="auth-tab" data-auth-mode="signup">Sign up</button>
        </div>
        <label for="authUsername">Username</label>
        <input id="authUsername" class="input" type="text" autocomplete="username" required minlength="3" placeholder="Enter username">
        <label for="authPassword">Password</label>
        <input id="authPassword" class="input" type="password" autocomplete="current-password" required minlength="4" placeholder="Enter password">
        <p id="authMessage" class="auth-message" role="status"></p>
        <button id="authSubmit" class="button button--primary auth-submit" type="submit">Login</button>
        <p class="field-help">Demo account storage is local to this browser. Do not use a real or reused password.</p>
      </form>
    </section>
`;
function FoundArkApp() {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: appMarkup } });
}
ReactDOM.render(React.createElement(FoundArkApp), document.getElementById('root'));
