$(document).ready(function(){

    // IDE
    const IDEInput = $("#ide-input")
    const IDEPreview = $("#ide-preview")
    const IDEEditor = new IDE(
        IDEInput,
        {
            callback: {
                input: function(input,editor){
                    IDEPreview.html(editor.toHTML())
                }
            }
        }
    );

    // MCE
    const MCEInput = $("#mce-input")
    const MCEPreview = $("#mce-preview")
    const MCEEditor = new MCE(
        MCEInput,
        {
            callback: {
                input: function(input,editor){
                    MCEPreview.html(editor.toMarkdown())
                }
            }
        }
    );

    // Load Markdown Syntax
    const URL = 'https://raw.githubusercontent.com/showdownjs/showdown/master/docs/markdown-syntax.md';
    setTimeout(function() {
        fetch(URL)
            .then(response => response.text())
            .then(data => {

                // IDE
                IDEEditor.val(data);

                // MCE
                MCEEditor.val(IDEPreview.html());
            })
            .catch(error => console.error('Error:', error));
    }, 100);
});