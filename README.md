# solidjs-pdf

Generating PDF files from SolidJS "templates" - based on jsPDF's HTML to PDF

This package contains some basic components to specify the structure of the PDF document.
There are component:
- **Document** - to specify the document properties.
- **Page** - to specify the page properties - forces new page.
- **Figure** - for wrapping images and other figures. It will not break the content to multiple pages. It can move the figure to another place in the document to achieve better layout.
- **NoBreak** - for wrapping content that should not be broken to multiple pages.
- **Preview** - to preview the document in browser. It does not use PDF to render the preview.

When creating document, you should use `Document` component as root element. Document should contain `Page` components as children. Each `Page` component will create new page in the document.
If content of the page is too long, it will be automatically split to multiple pages.

## Example

```tsx
const jsPDFDocument = await createPDF(() => <TestDocument title="My Test Document"/>);
jsPDFDocument.save();
```

**Example document**

```tsx
export function TestDocument(props: { title }) {
    return <Document title="My Document" format="A4" padding="10mm" formatting={{fontSize: 11}}>
        <Page>
            <h1>{props.title}</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae pellentesque justo. Maecenas vitae
                convallis nisl. Morbi luctus malesuada nisl eu tempor. Cras risus mi, efficitur id imperdiet ac, placerat ut
                dolor. Donec a libero felis. Duis fermentum nisl ac erat sagittis facilisis. Etiam fringilla diam in metus
                finibus, at lacinia orci imperdiet. Phasellus quis gravida augue. Nulla malesuada sit amet lacus at
                vestibulum. Vestibulum suscipit nisl iaculis vehicula egestas. Duis mi nisi, mollis at erat sed, auctor
                commodo justo. Integer feugiat ultricies enim. Aenean eget vehicula neque. Vivamus viverra elit id cursus
                fringilla. Pellentesque eu augue nec lorem consequat hendrerit. Aenean at lobortis erat, nec egestas nisl.
            </p>
            <p>
                Nunc ultrices mattis semper. Curabitur elit augue, consequat ullamcorper sapien eu, consequat tristique eros.
                Suspendisse suscipit ultrices eros vitae sodales. Pellentesque eu tortor eu lectus volutpat scelerisque vel
                eu sem. Aenean dapibus purus sit amet tellus tincidunt, sed vehicula orci fringilla. Vestibulum sed ex
                molestie, egestas tortor ac, mattis magna. Suspendisse ac libero vitae odio blandit aliquet. Proin eu
                facilisis quam, non blandit nibh. Morbi scelerisque diam vel commodo dignissim. Curabitur lobortis tincidunt
                mauris vitae efficitur. Nunc suscipit, metus quis porta maximus, felis sem vulputate dui, non ultricies nisl
                lectus nec odio. Morbi nec felis efficitur, rhoncus leo et, varius est. Integer rutrum a orci et efficitur.
                Duis eu felis quis enim elementum aliquet ac vel erat. Cras a diam id felis hendrerit feugiat.
            </p>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu
                porttitor.
            </p>

            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                        <th>Header 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 4</td>
                        <td>Data 5</td>
                        <td>Data 6</td>
                    </tr>
                    <tr>
                        <td>Data 7</td>
                        <td>Data 8</td>
                        <td>Data 9</td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 4</td>
                        <td>Data 5</td>
                        <td>Data 6</td>
                    </tr>
                    <tr>
                        <td>Data 7</td>
                        <td>Data 8</td>
                        <td>Data 9</td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 4</td>
                        <td>Data 5</td>
                        <td>Data 6</td>
                    </tr>
                    <tr>
                        <td>Data 7</td>
                        <td>Data 8</td>
                        <td>Data 9</td>
                    </tr>
                </tbody>
            </table>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae pellentesque justo. Maecenas vitae
                convallis nisl. Morbi luctus malesuada nisl eu tempor. Cras risus mi, efficitur id imperdiet ac, placerat ut
                dolor. Donec a libero felis. Duis fermentum nisl ac erat sagittis facilisis. Etiam fringilla diam in metus
                finibus, at lacinia orci imperdiet. Phasellus quis gravida augue. Nulla malesuada sit amet lacus at
                vestibulum. Vestibulum suscipit nisl iaculis vehicula egestas. Duis mi nisi, mollis at erat sed, auctor
                commodo justo. Integer feugiat ultricies enim. Aenean eget vehicula neque. Vivamus viverra elit id
                cursus fringilla.
            </p>
        </Page>
        <Page>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae pellentesque justo. Maecenas vitae
                convallis nisl. Morbi luctus malesuada nisl eu tempor. Cras risus mi, efficitur id imperdiet ac, placerat ut
                dolor. Donec a libero felis. Duis fermentum nisl ac erat sagittis facilisis. Etiam fringilla diam in metus
                finibus, at lacinia orci imperdiet. Phasellus quis gravida augue. Nulla malesuada sit amet lacus at
                vestibulum. Vestibulum suscipit nisl iaculis vehicula egestas. Duis mi nisi, mollis at erat sed, auctor
                commodo justo. Integer feugiat ultricies enim. Aenean eget vehicula neque. Vivamus viverra elit id cursus
                fringilla. Pellentesque eu augue nec lorem consequat hendrerit. Aenean at lobortis erat, nec egestas nisl.
            </p>
            <p>
                Nunc ultrices mattis semper. Curabitur elit augue, consequat ullamcorper sapien eu, consequat tristique eros.
                Suspendisse suscipit ultrices eros vitae sodales. Pellentesque eu tortor eu lectus volutpat scelerisque vel
                eu sem. Aenean dapibus purus sit amet tellus tincidunt, sed vehicula orci fringilla. Vestibulum sed ex
                molestie, egestas tortor ac, mattis magna. Suspendisse ac libero vitae odio blandit aliquet. Proin eu
                facilisis quam, non blandit nibh. Morbi scelerisque diam vel commodo dignissim. Curabitur lobortis tincidunt
                mauris vitae efficitur. Nunc suscipit, metus quis porta maximus, felis sem vulputate dui, non ultricies nisl
                lectus nec odio. Morbi nec felis efficitur, rhoncus leo et, varius est. Integer rutrum a orci et efficitur.
                Duis eu felis quis enim elementum aliquet ac vel erat. Cras a diam id felis hendrerit feugiat.
            </p>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu
                porttitor.
            </p>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu
                porttitor.
            </p>

            <Figure>
                <img src={logo} alt="logo" height={600}/>
            </Figure>
        </Page>
        <Page>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae pellentesque justo. Maecenas vitae
                convallis nisl. Morbi luctus malesuada nisl eu tempor. Cras risus mi, efficitur id imperdiet ac,
                placerat ut dolor. Donec a libero felis. Duis fermentum nisl ac erat sagittis facilisis. Etiam fringilla diam in metus
                finibus, at lacinia orci imperdiet. Phasellus quis gravida augue. Nulla malesuada sit amet lacus at
                vestibulum. Vestibulum suscipit nisl iaculis vehicula egestas. Duis mi nisi, mollis at erat sed, auctor
                commodo justo. Integer feugiat ultricies enim. Aenean eget vehicula neque. Vivamus viverra elit id
                cursus fringilla. Pellentesque eu augue nec lorem consequat hendrerit. Aenean at lobortis erat, nec egestas nisl.
            </p>
            <p>
                Nunc ultrices mattis semper. Curabitur elit augue, consequat ullamcorper sapien eu, consequat tristique eros.
                Suspendisse suscipit ultrices eros vitae sodales. Pellentesque eu tortor eu lectus volutpat scelerisque vel
                eu sem. Aenean dapibus purus sit amet tellus tincidunt, sed vehicula orci fringilla. Vestibulum sed ex
                molestie, egestas tortor ac, mattis magna. Suspendisse ac libero vitae odio blandit aliquet. Proin eu
                facilisis quam, non blandit nibh. Morbi scelerisque diam vel commodo dignissim. Curabitur lobortis tincidunt
                mauris vitae efficitur. Nunc suscipit, metus quis porta maximus, felis sem vulputate dui, non ultricies nisl
                lectus nec odio. Morbi nec felis efficitur, rhoncus leo et, varius est. Integer rutrum a orci et efficitur.
                Duis eu felis quis enim elementum aliquet ac vel erat. Cras a diam id felis hendrerit feugiat.
            </p>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu porttitor.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae pellentesque justo. Maecenas vitae
                convallis nisl. Morbi luctus malesuada nisl eu tempor. Cras risus mi, efficitur id imperdiet ac,
                placerat ut dolor. Donec a libero felis. Duis fermentum nisl ac erat sagittis facilisis. Etiam fringilla diam in metus
                finibus, at lacinia orci imperdiet. Phasellus quis gravida augue. Nulla malesuada sit amet lacus at
                vestibulum. Vestibulum suscipit nisl iaculis vehicula egestas. Duis mi nisi, mollis at erat sed, auctor
                commodo justo. Integer feugiat ultricies enim. Aenean eget vehicula neque. Vivamus viverra elit id cursus
                fringilla. Pellentesque eu augue nec lorem consequat hendrerit. Aenean at lobortis erat, nec egestas nisl.
            </p>
            <p>
                Nunc ultrices mattis semper. Curabitur elit augue, consequat ullamcorper sapien eu, consequat tristique eros. 
                Suspendisse suscipit ultrices eros vitae sodales. Pellentesque eu tortor eu lectus volutpat scelerisque
                vel eu sem. Aenean dapibus purus sit amet tellus tincidunt, sed vehicula orci fringilla. Vestibulum sed ex
                molestie, egestas tortor ac, mattis magna. Suspendisse ac libero vitae odio blandit aliquet. Proin eu
                facilisis quam, non blandit nibh. Morbi scelerisque diam vel commodo dignissim. Curabitur lobortis
                tincidunt mauris vitae efficitur. Nunc suscipit, metus quis porta maximus, felis sem vulputate dui, non ultricies nisl
                lectus nec odio. Morbi nec felis efficitur, rhoncus leo et, varius est. Integer rutrum a orci et efficitur.
                Duis eu felis quis enim elementum aliquet ac vel erat. Cras a diam id felis hendrerit feugiat.
            </p>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu
                porttitor.
            </p>
            <NoBreak>
                <p>
                    Nunc ultrices mattis semper. Curabitur elit augue, consequat ullamcorper sapien eu, consequat tristique eros.
                    Suspendisse suscipit ultrices eros vitae sodales. Pellentesque eu tortor eu lectus volutpat scelerisque vel
                    eu sem. Aenean dapibus purus sit amet tellus tincidunt, sed vehicula orci fringilla. Vestibulum sed ex
                    molestie, egestas tortor ac, mattis magna. Suspendisse ac libero vitae odio blandit aliquet. Proin eu
                    facilisis quam, non blandit nibh. Morbi scelerisque diam vel commodo dignissim. Curabitur lobortis tincidunt
                    mauris vitae efficitur. Nunc suscipit, metus quis porta maximus, felis sem vulputate dui, non ultricies nisl
                    lectus nec odio. Morbi nec felis efficitur, rhoncus leo et, varius est. Integer rutrum a orci et efficitur.
                    Duis eu felis quis enim elementum aliquet ac vel erat. Cras a diam id felis hendrerit feugiat.
                </p>
            </NoBreak>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu
                porttitor.
            </p>
        </Page>
        <Page orientation="landscape">
            <NoBreak>
                <p>
                    Nunc ultrices mattis semper. Curabitur elit augue, consequat ullamcorper sapien eu, consequat tristique eros.
                    Suspendisse suscipit ultrices eros vitae sodales. Pellentesque eu tortor eu lectus volutpat scelerisque vel
                    eu sem. Aenean dapibus purus sit amet tellus tincidunt, sed vehicula orci fringilla. Vestibulum sed ex
                    molestie, egestas tortor ac, mattis magna. Suspendisse ac libero vitae odio blandit aliquet. Proin eu
                    facilisis quam, non blandit nibh. Morbi scelerisque diam vel commodo dignissim. Curabitur lobortis tincidunt
                    mauris vitae efficitur. Nunc suscipit, metus quis porta maximus, felis sem vulputate dui, non ultricies nisl
                    lectus nec odio. Morbi nec felis efficitur, rhoncus leo et, varius est. Integer rutrum a orci et efficitur.
                    Duis eu felis quis enim elementum aliquet ac vel erat. Cras a diam id felis hendrerit feugiat.
                </p>
            </NoBreak>
            <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum interdum tristique. Curabitur
                ut ipsum purus. In at eros a lacus rhoncus luctus nec quis orci. Curabitur dapibus ante at lorem aliquam, a
                elementum mauris sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Donec et ipsum sit amet mauris feugiat fringilla. Proin blandit commodo lacus eu
                porttitor.
            </p>
        </Page>
    </Document>;
}
```